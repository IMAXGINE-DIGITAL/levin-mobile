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
            <div class="bg">
                <img src="${path}/bg.jpg" />
            </div>
            <div class="el bag anime fade-in" style="${elementRect(640,663,0,184)}">
                <img src="${path}/bag.jpg"/>
            </div>
            <div class="el text anime fade-in text-wrap" style="${elementRect(536,134,20,939)}">
                <span class="text_a" style="${elementRect(536,80,0,0,[536,134])}">超大行李空间</span>
                <span class="text_b" style="${elementRect(536,40,0,90,[536,134])}">梦想再大，行囊再多，也能装载自如</span>
            </div>
        </div>
    `;
}



export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
        return animation.get('.bag').animate({
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
