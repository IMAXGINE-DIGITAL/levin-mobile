import './page_b.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

function _elementRect(w,h,x,y) {
    return elementRect(w,h,x,y,[1357,1136]);
}

export function render() {
    var path = 'images/page_b';

    return `
        <div class="wrap" style="${elementRect(1357,1136,0,0)}">
            <div class="bg" style="${_elementRect(1357,1136,0,0)}">
                <img src="${path}/bg.jpg">
            </div>
            <div class="el line1 anime box-unfold" style="${_elementRect(660,629,33,331)}">
                <img src="${path}/line1.png">
            </div>
            <div class="el line2 anime box-unfold" style="${_elementRect(699,41,579,387)}">
                <img src="${path}/line2.png">
            </div>
            <div class="el line3 anime box-unfold" style="${_elementRect(477,190,761,592)}">
                <img src="${path}/line3.png">
            </div>
            <div class="el text anime fly-in" style="${_elementRect(435,150,262,159)}">
                <img src="${path}/text.png">
            </div>
        </div>
    `;
}



function animeLeft(el, style, duration) {
    return new Promise(function(resolve, reject) {
        el.animate({
            left: style
        }, {
            duration: duration,
            easing: 'linear',
            complete: resolve
        });
    });
}

export function show($page) {
    var animation = $page.animation();

    animeLeft = animeLeft.bind(this, $page.find('.wrap'));
    
    return animation.then(function(){
        return animeLeft('-112.03%', 2000)
            .then(function() {
                return animeLeft('-38.59%', 1200);
            });
    }).then(function() {
        return animation.get('.line1').animate({
            duration: 800,
            'box-unfold': {
                origin: [0, 0],
                angle: 0
            }
        }).then(function() {
            $page.find('.line1')
                .removeClass('box-unfold')
                .addClass('box-fold')
        });
    }).then(function() {
        return animation.get('.line1').animate({
            duration: 800,
            delay: 200,
            'box-fold': {
                origin: ['100%', 0],
                angle: 0
            }
        }).then(function() {
            $page.find('.line1').hide();
        });
    }).then(function() {
        return animation.get('.line2').animate({
            duration: 600,
            'box-unfold': {
                origin: ['100%', '100%'],
                angle: 0
            }
        }).then(function() {
            $page.find('.line2')
                .removeClass('box-unfold')
                .addClass('box-fold');
        });
    }).then(function() {
        return animation.get('.line3').animate({
            duration: 600,
            delay: 200,
            'box-unfold': {
                origin: [0, 0],
                angle: 0
            }
        }).then(function() {
            $page.find('.line3')
                .removeClass('box-unfold')
                .addClass('box-fold');
        });
    }).then(function() {
        return animation.get('.line2').animate({
            duration: 600,
            'box-fold': {
                origin: [0, 0],
                angle: 0
            }
        }).then(function() {
            $page.find('.line2').hide();
        })
    }).then(function() {
        return animation.get('.line3').animate({
            duration: 600,
            delay: 200,
            'box-fold': {
                origin: ['100%', 0],
                angle: 0
            }
        }).then(function() {
            $page.find('.line3').hide();
        });
    }).then(function() {
        return animation.get('.text').animate({
            duration: 400,
            timingFunction: 'easeOut',
            'fly-in': {
                from: 'bottom'
            }
        });
    });
}