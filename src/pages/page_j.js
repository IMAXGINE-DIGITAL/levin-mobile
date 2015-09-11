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
            <div class="el text anime fade-in" 
                style="${IF_TEMPLATE(ss, 
                    elementRect(296,94,126,408),
                    elementRect(296,94,106,358))}">
                <img src="${path}/text.png">
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