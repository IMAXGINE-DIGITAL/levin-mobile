import './page_a.less';
import $ from 'jquery';
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
/**
 * 400 × 269
 *                 <div class="el car anime zoom" style="${elementRect(640,430,-20,460)}">

 */
export function render() {
    var path = 'images/page_ab';

    return `
        <div class="el car anime slide-in" style="${elementRect(1000,1136,0,0)}">
            <img src="${path}/car-total.jpg" />
        </div>
        <div class="el gray anime fade-in" style="${elementRect(640,1136,0,-2)}">
            <img src="${path}/gray.jpg" />
        </div>
        <div class="el logo anime box-unfold" style="${elementRect(145,31,95,411)}">
            <img src="${path}/logo.png"/>
        </div>
        <div class="el car-light anime fade-in" style="${elementRect(640,1136,0,-2)}">
            <img src="${path}/car-light.jpg" />
        </div>
        <div class="el number-text anime number" style="font-style:italic;font-size:140%;text-align:left;color:#fff;${elementRect(180,90,218,732)}">
        </div>
        <div class="el text anime box-unfold" style="${elementRect(478,107,158,757)}">
            <img src="${path}/text.png" />
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
            return animation.get('.car').animate({
                duration: 1200,
                'slide-in': {
                    offset: '56.25%',
                    from: 'left'
                }
            })
        }).then(function() {
            return animation.get('.gray').animate({
                duration: 400,
                delay: 200
            });
        }).then(function(item) {
            return animation.get('.logo').animate({
                duration: 1000,
                delay: 200,
                'box-unfold': {
                    origin: [0, 0],
                    angle: 0
                }
            });
        }).then(function() {
            return animation.get('.car-light').animate({
                duration: 400,
                delay: 100
            });
        }).then(function(item) {
            return animation.get('.number-text').animate({
                duration: 400,
                'number': {
                    from: 0,
                    to: 51,
                    format: '%02%01+' // %00代表输出一个0。%1为个位数，%2为十位数，以此类推，如果要补0，则为%01，%02等。
                }
            })
        })
        .then(function() {
            return animation.get('.text').animate({
                duration: 600,
                'box-unfold': {
                    origin: [0, 0],
                    angle: 0
                }
            });
        })


}
