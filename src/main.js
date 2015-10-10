import './main.less';
import $ from 'jquery';
import {Promise, domReady, defer} from './lib/promise';
import './lib/viewport';
import * as nav from './lib/nav';
import * as menu from './lib/menu';
import * as rotate from './lib/rotate';
import * as page from './lib/page';
import * as pagescroll from './lib/pagescroll';
import './lib/gesture';
import preload from './lib/preload';
preload();

window.prevPage = function() {
    $(document).trigger('pagechange', 'prev');
}

window.nextPage = function() {
    $(document).trigger('pagechange', 'next');
}

domReady().then(function() {
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });

    var $body = $(window.document.body);
    var ua = window.navigator.userAgent;
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (w / h >= 0.72) {
        $body.addClass('ss');
        window.fixSmallScreen = true;
    }
});


page.ready().then(function ($pageRoot) {
    var $win = $(window);
    var $doc = $(window.document);

    function getHashName() {
        var hash = location.hash.replace('#', '');
        var name = hash || 'home';
        return name;
    }

    function hashchange() {
        var deferred = defer();

        $win.on('hashchange', function handler() {
            $win.off('hashchange', handler);
            var name = getHashName();
            deferred.resolve(name);
        });

        return deferred.promise;
    }

    function pagechange() {
        var deferred = defer();

        $doc.on('pagechange', function handler(e, name) {
            $doc.off('pagechange', handler);
            deferred.resolve(name);
        });

        return deferred.promise;
    }

    function pageflick() {
        var deferred = defer();

        $doc.on('verticalflick', function handler(e) {
            var originalEvent = e.originalEvent;
            $doc.off('verticalflick', handler);

            var name;
            if (originalEvent.displacementY < 0) {
                name = 'next';
            } else {
                name = 'prev';
            }
            deferred.resolve(name);
        });

        return deferred.promise;
    }

    function debuggerLog(name) {
        if (location.search.indexOf('debug') > 0) {
            console.debug(name);
            location.replace('#' + name);
        }
    }

    function circle(curName) {
        Promise.race([
            hashchange(),
            pagechange(),
            pageflick(),
            menu.navto() 
        ]).then(function(ret) {
            var name;
            if (['next', 'prev'].indexOf(ret) > -1) {
                name = page[ret](curName);
            } else if (typeof ret === 'number'){
                name = page.fromIndex(ret);
            } else {
                name = ret;
            }

            if (name && name !== curName) {
                debuggerLog(name);
                return pagescroll.scroll($pageRoot, name);
            } else {
                return curName;
            }
        }).then(function(name) {
            if (name === 'home') {
                nav.hideBackBtn();
            } else {
                nav.showBackBtn();
            }
            return circle(name);
        });
    }

    var name = getHashName();
    pagescroll.scroll($pageRoot, 'home').then(function() {
        if (name !== 'home') {
            debuggerLog(name);
            return pagescroll.scroll($pageRoot, name);
        } else {
            return name;
        }
    }).then(circle);
});
