import './page_aj.less';
import * as jQuery from 'jquery';
import {
    Promise, defer
}
from '../lib/promise';
import * as page from '../lib/page';
import {
    elementRect
}
from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();


export function render() {
    var path = 'images/page_aj';

    return `
        <div class="wrap">
            <div class="bg-wrap" style="${elementRect(1600,1136,0,0)}">
                <img src="${path}/bg.jpg">
            </div>
            <div class="el bag anime fade-in" style="${elementRect(640,663,0,190)}">
                <img src="${path}/bag.jpg"/>
            </div>
            <div class="el text anime fly-in text-wrap" style="${elementRect(536,134,20,939)}">
                <span class="text_a" style="${elementRect(536,80,0,0,[536,134])}">超大行李空间</span>
                <span class="text_b" style="${elementRect(536,40,0,90,[536,134])}">梦想再大，行囊再多，也能装载自如</span>
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
    
    animeLeft = animeLeft.bind(this, $page.find('.bg-wrap'));

    return animation.then(function(item) {
            return animeLeft('-150%', 2000)
                .then(function() {
                    return animeLeft('-100.3%', 1200);
                });
        }).then(function() {
            return animation.get('.bag').animate({
                delay: 400,
                duration:600
            });
        }).then(function(item) {
        return animation.get('.text').animate({
                delay: 400,
                duration:400,
                'fly-in': {
                    from: 'bottom'
                }
            })
        })
        
}
