import './page.less';
import $ from 'jquery';
import {Promise, defer} from './promise';
import * as viewport from './viewport';
import {elementRect} from './util';
import * as preload from './preload';

var placeHolderImg = require('../../images/placeholder');

var deferred = defer();
var pages = {};

var a = $('<a></a>');
function getUrl(path) {
    return a.attr('href', path).attr('href');
}

export function ready() {
    return deferred.promise;
}

function $IF_TEMPLATE(condition, fun1, fun2) {
    var value = condition ? fun1 : fun2;
    if (typeof value === 'function') {
        return value();
    } else {
        return value;
    }
}

export function add(name) {
    var page = require('../pages/' + name);
    var deferred = defer();

    if (!page) {
        deferred.reject();
        return;
    }

    function render() {
        return ready().then(function($pages) {
            $pages.find(`#${name}`).remove();
            var $root = $(`<div id="${name}" class="page"></div>`);
            var $html = $(page.render({
                IF_TEMPLATE: $IF_TEMPLATE
            }));

            var promises = [];

            $html.find('img').each(function() {
                var $img = $(this);
                var src = getUrl($img.attr('src'));
                if (!src.match(/^data:image/) && 
                    $img.attr('preload') !== 'false') {

                    $img.attr('src', placeHolderImg);

                    var promise = preload.getImage(src)
                            .then(function(image) {
                                return $img.replaceWith(image);
                            })['catch'](function(e) {
                                return new Promise(function(resolve) {
                                    $img.on('load', function handle() {
                                        $img.off('load', handle);
                                        resolve();
                                    }).attr('src', 'src')
                                });
                            });

                    if (name !== 'home') {
                        promises.push(promise);
                    }
                }
            });

            $root.append($html);
            $pages.children().append($root);

            return Promise.all(promises).then(function() {
                return $root;
            });
        });
    }

    // var shown;
    var rootDeferred;
    pages[name] = {
        root: function() {
            return rootDeferred.promise;
        },
        render: function() {
            rootDeferred = defer();

            return render().then(function($root) {
                rootDeferred.resolve($root);
            });

            return rootDeferred.promise;
        },
        show: function() {
            return rootDeferred.promise
                .then(function($root) {
                    return page.show($root);
                });
        }
    };

    deferred.resolve();
    return deferred.promise;
}

export function get(name) {
    return pages[name];
}

export function prev(name) {
    var i = indexOf(name);
    if (i > 0 && seq[i - 1]) {
        return seq[i - 1];
    }
}

export function next(name) {
    var i = indexOf(name);
    if (i > -1 && seq[i + 1]) {
        return seq[i + 1];
    }
}

export function has(name) {
    return !!pages[name];
}

export function show(name) {
    var page = get(name);
    return page.show();
}

var seq = [
    'home',   // 0:加载
    // 外观组
    'page_a', // 1:外观
    'page_aa', // 大灯前脸
    'page_ab', // 尾灯
    'page_ah', // 空气导流
    // 内饰组
    'page_b', // 5:内饰
    'page_c', // 天窗
    'page_d', // 空调
    
    // 空间组
    'page_e', // 8:轴距
    'page_ai', // 后排
    'page_f', // 座椅
    'page_aj', // 后备
    
    // 操控
    'page_g', // 12:油耗
    'page_j', // 变速器
    'page_i', // 换挡
    
    // 安全
    'page_ag', // 15:五星安全
    'page_af', // GOA车身
    'page_ae', // 主动安全配置
    'page_h', // 主动安全系统

    // 留资
    'page_z' // 留资
]
export function indexOf(name) {
    return seq.indexOf(name);
}

export function fromIndex(i) {
    return seq[i];
}

export function length() {
    return seq.length;
}

function render() {
    return `
        <div id="pages"><div class="page_wrap"></div></div>
    `;
}

viewport.ready().then(function ($viewport) {
    var $pages = $(render());
    $viewport.append($pages);
    deferred.resolve($pages);
});