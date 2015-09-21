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


export function render({IF_TEMPLATE}) {
    var path = 'images/page_ah';
    var ss = window.fixSmallScreen;

    return `
        <div class="el bg" style="${elementRect(640,1136,0,0)}">
            <img src="${path}/bg.jpg"/>
        </div>
        <div class="el lg1 rotate" style="${elementRect(96,96,445,876)}">
            <img src="${path}/lg.png"/>
        </div>
        <div class="el lg2 rotate" style="${elementRect(96,96,58,876)}">
            <img src="${path}/lg1.png"/>
        </div>
        <div class="el dl anime box-unfold" style="${elementRect(756,154,0,746)}">
            <img src="${path}/dl.png"/>
        </div>
        <div class="el text anime fade-in text-wrap" 
            style="${IF_TEMPLATE(ss, 
                elementRect(451,103,38,506),
                elementRect(451,103,38,326))}">
            <span class="text_a" style="${elementRect(451,70,0,0,[451,103])}">
                与其追风，不如破风而行
            </span>
            <span class="text_b" style="${elementRect(451,30,0,73,[451,103])}">
                F1空气动力学设计，风阻系数只有0.29
            </span>
        </div>
    `;
}



export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
        return animation.get('.dl').animate({
                delay: 400,
                duration:400,
                'box-unfold':{
                    origin: ['100%', 0], 
                    angle:0
                }
            })
        })
        .then(function(item){
           return animation.get('.text').animate({
                delay: 400,
                duration:400
            })
             
        })

        
}
