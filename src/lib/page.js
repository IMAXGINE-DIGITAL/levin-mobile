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

export function add(name) {
    var page = require('../pages/' + name);
    var deferred = defer();

    if (!page) {
        deferred.reject();
        return;
    }

    var $root = $(`<div id="${name}" class="page"></div>`);
    var $html = $(page.render());

    $html.find('img').each(function() {
        var $img = $(this);
        var src = getUrl($img.attr('src'));
        if (!src.match(/^data:image/)) {

            $img.attr('src', placeHolderImg);

            preload.getImage(src)
                .then(function(image) {
                    $img.replaceWith(image);
                })['catch'](function(e) {
                    $img.attr('src', src);
                });
        }
    });

    $root.append($html);

    var shown;
    pages[name] = {
        $root: $root,
        show: function() {
            if (!shown) {
                shown = page.show($root);
            }
            return shown;
        }
    };

    ready().then(function($pages) {
        $pages.append($root);
        deferred.resolve();
    });

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
    'home',   // 加载
    // 外观组
    'page_a', // 外观
    // 内饰组
    
    // 空间组
    
    // 操控
    
    // 安全
]
export function indexOf(name) {
    return seq.indexOf(name);
}

export function fromIndex(i) {
    return seq[i];
}

function render() {
    return `
        <div id="pages"></div>
    `;
}

viewport.ready().then(function ($viewport) {
    var $pages = $(render());
    $viewport.append($pages);
    deferred.resolve($pages);
});