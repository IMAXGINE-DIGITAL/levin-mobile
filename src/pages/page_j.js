import './page_j.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render({IF_TEMPLATE}) {
    var path = 'images/page_j';
    var ss = window.fixSmallScreen

    return `
        <div class="wrap">
            <div class="bg"><img src="${path}/bg.jpg"></div>
            <div class="el text anime fade-in text-wrap" 
                style="${IF_TEMPLATE(ss, 
                    elementRect(296,94,126,408),
                    elementRect(296,94,106,358))}">
                <img src="${path}/light.png">
                <span class="text_a" style="${elementRect(296,94,0,0,[296,94])}">速激情</span>
                <span class="text_b" style="${elementRect(296,50,210,30,[296,94])}">操控</span>
                <span class="text_c" style="${elementRect(296,35,0,70,[296,94])}">无穷驾驶乐趣，应手，得心</span>
            </div>
            <div class="el number1 anime number" 
                style="${IF_TEMPLATE(ss, 
                    elementRect(99,132,34,350),
                    elementRect(99,132,14,300))}">
                0
            </div>
            <div class="el shift anime box-unfold" style="${elementRect(396,144,92,822)}">
                <img src="${path}/shift.png">
            </div>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.shift').animate({
                duration: 500,
                'box-unfold': {
                    origin: [0, '100%'],
                    angle: 20
                }
            }).then(function() {
                $page.find('.shift')
                    .removeClass('box-unfold')
                    .addClass('box-fold')
                    .hide();

                $page.find('.shift .child-wrap')
                    .remove()
                    .children()
                    .appendTo($page.find('.shift'));
            });
        }).then(function() {
            return animation.get('.shift').animate({
                duration: 500,
                delay: 200,
                'box-fold': {
                    origin: ['100%', 0],
                    angle: 20
                }
            }).then(function() {
                $page.find('.shift')
                    .removeClass('box-fold')
                    .addClass('fade-in')
                    .hide();

                $page.find('.shift .child-wrap')
                    .remove()
                    .children()
                    .appendTo($page.find('.shift'));
            });
        }).then(function() {
            return animation.get('.shift').animate({
                duration: 400
            });
        }).then(function() {
            return animation.get('.number1').animate({
                duration: 200,
                delay: 200,
                number: {
                    from: 0,
                    to: 8,
                    format: '%01'
                }
            });
        }).then(function(item) {
            return animation.get('.text').animate({
                duration: 400
            });
        })
}