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
    var path = 'images/page_ah';

    return `
        
        <div class="el bg" style="${elementRect(640,1096,0,0)}">
            <img src="${path}/bg.jpg"/>
        </div>

        

        <div class="el lg rotate" style="${elementRect(96,96,445,810)}">
            <img src="${path}/lg.png"/>
        </div>

        <div class="el lg rotate" style="${elementRect(96,96,58,810)}">
            <img src="${path}/lg1.png"/>
        </div>

        <div class="el dl anime box-unfold" style="${elementRect(756,154,0,698)}">
            <img src="${path}/dl.png"/>
        </div>

        <div class="el text anime fade-in" style="${elementRect(451,73,38,239)}">
            <img src="${path}/text.png"/>
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
