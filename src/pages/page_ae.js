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
    var path = 'images/page_ae';

    return `
        <div class="el car anime slide-in" style="${elementRect(1000,1096,0,0)}">
            <img src="${path}/car.jpg" />
        </div>

        <div class="el car-qn anime fade-in" style="${elementRect(640,1096,0,0)}">
            <img src="${path}/car2.jpg" />
        </div>

        <div class="el text anime fade-in" style="${elementRect(528,74,28,946)}">
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
        return animation.get('.car-qn').animate({
            duration: 600,
            delay: 200
        });
    }).then(function() {
        return animation.get('.text').animate({
            duration: 400
        });
    })


}
