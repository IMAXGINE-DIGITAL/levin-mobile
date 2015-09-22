import './page_af.less';
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
export function render({IF_TEMPLATE}) {
    var path = 'images/page_af';
    var ss = window.fixSmallScreen;

    return `
        <div class="bg"}">
            <img src="${path}/bg.jpg" />
        </div>
        <div class="wrap">
            <div class="el car anime fade-in" style="${elementRect(616,341,8,568)}">
                <img src="${path}/car.png" />
            </div>
            <div class="el text1 anime fade-in text-wrap" 
                style="${elementRect(780,130,16,381)}">
                <span class="text_a" style="${elementRect(780,70,0,0,[780,130])}">
                    享誉全球的丰田独有GOA车身
                </span>
                <span class="text_b" style="${elementRect(780,20,0,60,[780,130])}">
                    大量运用高抗拉强度钢板，打造轻量化、高强度车身。
                </span>
                <span class="text_b" style="${elementRect(780,20,0,87,[780,130])}">
                    其中，门内防撞杆梁的抗拉强度高达1470兆帕，同级罕见。
                </span>
            </div>
            <div class="el text2 anime fade-in" style="${elementRect(323,139,305,992)}">
                <img src="${path}/text2.png" />
            </div>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
        return animation.get('.car').animate({
            duration: 600,
            delay:200
        })
    }).then(function() {
        return animation.get('.text1').animate({
            duration: 400
        });
    })
    .then(function() {
        return animation.get('.text2').animate({
            duration: 400
        });
    })


}
