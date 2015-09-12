import './page_i.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render({IF_TEMPLATE}) {
    var path = 'images/page_i';
    var ss = window.fixSmallScreen;

    return `
        <div class="bg">
            <img src="${path}/bg.jpg">
        </div>
        <div class="el car anime fade-in" 
            style="${IF_TEMPLATE(ss, 
                elementRect(294 * 0.6, 720 * 0.6, 250, 400),
                elementRect(294 * 0.8, 720 * 0.8, 220,304))}">
            <img src="${path}/car.png">
        </div>
        <div class="el text anime fade-in" style="${elementRect(418,67,132,430)}">
            <img src="${path}/text.png">
        </div>
        <div class="el number1 anime number" style="${elementRect(92,127,46,374)}">
            8
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.car').animate({
                duration: 600,
                delay: 300
            });
        }).then(function(item) {
            return animation.get('.text').animate({
                duration: 600,
                delay: 300
            });
        }).then(function(item) {
            return animation.get('.number1').animate({
                duration: 400,
                delay: 300,
                number: {
                    from: 0,
                    to: 8,
                    format: '%1'
                }
            });
        });
}