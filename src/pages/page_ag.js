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
    var path = 'images/page_ag';

    return `
        <div class="car" style="${elementRect(640,1100,0,0)}">
            <img src="${path}/car.jpg" />
        </div>

        <div class="el car2 anime fade-in" style="${elementRect(640,1100,0,0)}">
            <img src="${path}/car2.jpg" />
        </div>

        <div class="el text1 anime fade-in" style="${elementRect(438,212,112,196)}">
            <img src="${path}/text1.png" />
        </div>

        <div class="el text2 anime fade-in" style="${elementRect(363,178,33,871)}">
            <img src="${path}/text2.png" />
        </div>

        
        
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
        return animation.get('.car2').animate({
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
