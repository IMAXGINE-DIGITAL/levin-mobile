import './menu.less';
import * as jQuery from 'jquery';
import {Promise, defer} from './promise';
import * as viewport from './viewport';
import {elementRect} from './util';
import * as nav from './nav';

var $ = jQuery.noConflict();
var deferred = defer();

export function ready() {
    return deferred.promise;
}

var path = 'images/menu';

function render() {
    return `
        <div id="menu">
            <div class="wrap">
                <div class="el goto-a" nav-to="1" style="${elementRect(374,375,199,19)}">
                    <img src="${path}/goto_a.png">
                </div>
                <div class="el goto-b" nav-to="5" style="${elementRect(374,375,5,212)}">
                    <img src="${path}/goto_b.png">
                </div>
                <div class="el goto-c" nav-to="8" style="${elementRect(371,374,199,405)}">
                    <img src="${path}/goto_c.png">
                </div>
                <div class="el goto-d" nav-to="12" style="${elementRect(375,375,5,598)}">
                    <img src="${path}/goto_d.png">
                </div>
                <div class="el goto-e" nav-to="15" style="${elementRect(376,376,195,790)}">
                    <img src="${path}/goto_e.png">
                </div>
                <div class="el top-menu-close" style="${elementRect(261,200,397,0)}">
                    <img src="${path}/top-menu-close.png">
                </div>
            </div>
        </div>
    `;
}

export function show() {
    ready().then(function($menu) {
        $menu.fadeIn();
    });
}

export function hide() {
    ready().then(function($menu) {
        $menu.fadeOut();
    });
}

export function navto() {
    return ready().then(function($menu) {
        return new Promise(function(resolve, reject) {
            $menu.on('click', '[nav-to]', function handler() {
                $menu.off('click', '[mav-to]', handler);
                hide();
                nav.show();
                resolve(parseInt($(this).attr('nav-to')));
            });
        });
    });
}

const WIDTH =  640;
const HEIGHT = 1136;
function resizeHandler($menu) {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var wRatio = WIDTH / width;
    var hRatio = HEIGHT / height;
    var ratio = Math.max(wRatio, hRatio);

    var rWidth = WIDTH / ratio;
    var rHeight = HEIGHT / ratio;
    $menu.find('.wrap').css({
        width: rWidth,
        height: rHeight
    });
}

viewport.ready().then(function ($viewport) {
    var $menu = $(render());
    $(document.body).append($menu);

    $(window).on('resize', function() {
        resizeHandler($menu);
    });

    $menu.on('click', '.top-menu-close', function() {
        hide();
        nav.show();
    });

    resizeHandler($menu);

    deferred.resolve($menu);
});