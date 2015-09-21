import './page_ai.less';
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
        <div class="el text anime fade-in text-wrap" 
            style="${IF_TEMPLATE(ss, 
                elementRect(517,117,8,549),
                elementRect(517,117,8,349))}">
            <span class="text_a" style="${elementRect(517,80,0,0,[517,117])}">
                媲美B级后车排
            </span>
            <span class="text_b" style="${elementRect(517,30,0,87,[517,117])}">
                地台平整化设计，身心尽情舒展
            </span>
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
