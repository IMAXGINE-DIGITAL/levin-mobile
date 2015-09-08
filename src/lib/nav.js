import './nav.less';
import $ from 'jquery';
import {Promise, defer} from './promise';
import * as viewport from './viewport';
import {elementRect} from './util';
import * as menu from './menu';

var deferred = defer();

export function ready() {
    return deferred.promise;
}

export function show() {
    ready().then(function($nav) {
        $nav.fadeIn();
    });
}

export function hide() {
    ready().then(function($nav) {
        $nav.fadeOut();
    });
}

export function showBackBtn() {
    ready().then(function($nav) {
        $nav.find('.back')
            .css('visibility', 'visible');
    });
}

export function hideBackBtn() {
    ready().then(function($nav) {
        $nav.find('.back')
            .css('visibility', 'hidden');
    });
}
 
var path = 'images/nav';

function render() {
    return `
        <div id="nav">
            <a class="back">返回</a>
            <a class="menu">菜单</a>
        </div>
    `;
}

viewport.ready().then(function ($viewport) {
    var $nav = $(render());
    $(document.body).append($nav);

    $nav.on('click', '.back', function() {
        $(document).trigger('pagechange', 'home');
    });

    $nav.on('click', '.menu', function() {
        hide();
        menu.show();
    });

    deferred.resolve($nav);
});