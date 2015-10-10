import './page_b.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

function _elementRect(w,h,x,y) {
    return elementRect(w,h,x,y,[1357,1136]);
}

export function render({IF_TEMPLATE}) {
    var path = 'images/page_b';
    var ss = window.fixSmallScreen;

    return `
        <div class="wrap" style="${elementRect(1357,1136,0,0)}">
            <div class="bg" style="${_elementRect(1357,1136,0,0)}">
                <img src="${path}/bg.jpg">
            </div>
            <div class="el line1 anime box-unfold" style="${_elementRect(660,629,33,336)}">
                <img src="${path}/line1.png">
            </div>
            <div class="el line2 anime box-unfold" style="${_elementRect(699,41,579,387)}">
                <img src="${path}/line2.png">
            </div>
            <div class="el line3 anime box-unfold" style="${_elementRect(477,190,761,592)}">
                <img src="${path}/line3.png">
            </div>
            <div class="el text anime fly-in text-wrap" 
                style="${_elementRect(435 * 0.8,150 * 0.8,530,189)}">
                <span class="text_a" 
                    style="${elementRect(325 * 0.8,108 * 0.8,0,0,[435 * 0.8,150 * 0.8])}">
                    高质感
                </span>
                <span class="text_b" 
                    style="${elementRect(86 * 0.8,40 * 0.8,330 * 0.8,69 * 0.8,[435 * 0.8,150 * 0.8])}">
                    内饰
                </span>
                <span class="text_c" 
                    style="${elementRect(435 * 0.8,40 * 0.8,0,115 * 0.8,[435 * 0.8,150 * 0.8])}">
                    前卫直切式中控台，宽适乘坐质感，无需妥协
                </span>
            </div>
        </div>
    `;
}



function animeLeft(el, style, duration) {
    return new Promise(function(resolve, reject) {
        console.log(el, style)
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
    console.log($page);

    var anime = animeLeft.bind(this, $page.find('.wrap'));
    
    return animation.then(function(){
        return anime('-112.03%', 2000)
            .then(function() {
                return anime('-38.59%', 1200);
            });
    }).then(function() {
        return animation.get('.line1').animate({
            duration: 400,
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
            duration: 400,
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
            duration: 300,
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
            duration: 300,
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
            duration: 300,
            'box-fold': {
                origin: [0, 0],
                angle: 0
            }
        }).then(function() {
            $page.find('.line2').hide();
        })
    }).then(function() {
        return animation.get('.line3').animate({
            duration: 300,
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