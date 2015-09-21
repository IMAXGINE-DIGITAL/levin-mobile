import './page_aa.less';
import $ from 'jquery';
import {Promise, defer}
from '../lib/promise';
import * as page from '../lib/page';
import {elementRect}
from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_aa';

    return `
        <div class="wrap">
            <div class="bg" style="${elementRect(640,1136,0,0)}">
                <img src="${path}/bg.jpg" />
            </div>
            <div class="el car anime zoom" style="${elementRect(100,67,264,670)}">
                <img src="${path}/car.png" />
            </div>

            <div class="el car-front anime box-unfold" style="${elementRect(650,365.625,-11,495)}">
                <img src="${path}/car-front.png" />
            </div>

            <div class="el light anime flash" style="${elementRect(636,91,0,604)}">
                <img src="${path}/light.png" />
            </div>

            <div class="el text anime fly-in text-wrap" style="${elementRect(479,110,33,300)}">
                <span class="text_a" style="${elementRect(479,70,0,0,[479,110])}">
                    我的型，我的范
                </span>
                <span class="text_b" style="${elementRect(479,30,0,80,[479,110])}">
                    够前卫，才能成为路上的焦点！
                </span>
            </div>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
        $page.find('.car').show();
    }).then(function() {
        return animation.get('.car').animate({
            duration: 400,
            delay: 200,
            'zoom': {
                from: '100%',
                to: '750%'
            }
        });
    })
    .then(function(item){
        return animation.get('.car-front').animate({
            duration:400,
            'box-unfold':{
                origin: [0, 0],
                angle: 0
            }
        });
        
    })
    .then(function(item){
        return animation.get('.light').animate({
            duration:400
        });
        
    })
    .then(function(item){
        return animation.get('.text').animate({
            duration:400,
            'fly-in':{
                from: 'left'
            }
        });
    })
}
