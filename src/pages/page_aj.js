import './page_ah.less';
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
        
        <div class="el car" style="${elementRect(640,1136,0,0)}">
            <img src="${path}/car.jpg"/>
        </div>

        <div class="el car2 anime fade-in" style="${elementRect(640,1136,0,0)}">
            <img src="${path}/car2.jpg"/>
        </div>

        <div class="el text anime fade-in" style="${elementRect(536,74,8,229)}">
            <img src="${path}/text.png"/>
        </div>



    `;
}



export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
        return animation.get('.car2').animate({
                delay: 400,
                duration:600
            })
        }).then(function(item) {
        return animation.get('.text').animate({
                delay: 400,
                duration:400
            })
        })
        
}
