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
    var path = 'images/page_ai';
    var ss = window.fixSmallScreen;

    return `
        <div class="el bg" style="${elementRect(640,1136,0,0)}">
            <img src="${path}/bg.jpg"/>
        </div>
        <div class="el text anime fade-in" 
            style="${IF_TEMPLATE(ss, 
                elementRect(517,76,8,549),
                elementRect(517,76,8,349))}">
            <img src="${path}/text.png"/>
        </div>
    `;
}



export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
        return animation.get('.text').animate({
                delay: 400,
                duration:400
            })
        })
        
}
