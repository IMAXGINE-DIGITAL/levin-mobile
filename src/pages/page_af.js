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
    var path = 'images/page_af';

    return `
        <div class="bg" style="${elementRect(640,1096,0,0)}">
            <img src="${path}/bg.jpg" />
        </div>

        <div class="el car anime fade-in" style="${elementRect(616,341,8,508)}">
            <img src="${path}/car.png" />
        </div>

        <div class="el text1 anime fade-in" style="${elementRect(567,111,16,211)}">
            <img src="${path}/text1.png" />
        </div>

        <div class="el text2 anime fade-in" style="${elementRect(323,139,305,912)}">
            <img src="${path}/text2.png" />
        </div>

        
        
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
        return animation.get('.car').animate({
            duration: 400,
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
