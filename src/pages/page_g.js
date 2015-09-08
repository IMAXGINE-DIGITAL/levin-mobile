import './page_g.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_g';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el shadow anime fade-in" style="${elementRect(427,158,121,964)}">
            <img src="${path}/shadow.jpg">
        </div>
        <div class="el engine anime fly-in" style="${elementRect(316,309,170,737)}">
            <img src="${path}/engine.png">
        </div>
        <div class="el table anime fade-in" style="${elementRect(588,187,20,352)}">
            <img src="${path}/table.png">
        </div>
        <div class="el red-line1 anime box-unfold" style="${elementRect(166,26,76,415)}">
            <img src="${path}/red-line1.png">
        </div>
        <div class="el blue-line1 anime box-unfold" style="${elementRect(163,99,78,396)}">
            <img src="${path}/blue-line1.png">
        </div>
        <div class="el red-line2 anime box-unfold" style="${elementRect(171,29,383,399)}">
            <img src="${path}/red-line2.png">
        </div>
        <div class="el blue-line2 anime box-unfold" style="${elementRect(171,101,384,378)}">
            <img src="${path}/blue-line2.png">
        </div>
        <div class="el fue anime fade-in" style="${elementRect(587,114,32,557)}">
            <img src="${path}/fue.png">
        </div>
        <div class="el number1 anime number" style="${elementRect(94,56,39,602)}">
            5.9
        </div>
        <div class="el number2 anime number" style="${elementRect(93,58,358,602)}">
            6.1
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.shadow').animate({
                duration: 400
            });
        }).then(function(item) {
            return animation.get('.engine').animate({
                duration: 600,
                delay: 200,
                timeingFunction: 'easeOut',
                'fly-in': {
                    from: 'bottom'
                }
            });
        }).then(function(item) {
            return animation.get('.table').animate({
                duration: 400,
                delay: 300
            });
        }).then(function(item) {
            return Promise.all([
                animation.get('.blue-line1').animate({
                    duration: 600,
                    delay: 300,
                    timeingFunction: 'linear',
                    'box-unfold': {
                        origin: [0, 0],
                        angle: 0
                    }
                }),
                animation.get('.red-line1').animate({
                    duration: 600,
                    delay: 500,
                    timeingFunction: 'linear',
                    'box-unfold': {
                        origin: [0, 0],
                        angle: 0
                    }
                })
            ]);
        }).then(function(item) {
            return Promise.all([
                animation.get('.blue-line2').animate({
                    duration: 600,
                    delay: 300,
                    timeingFunction: 'linear',
                    'box-unfold': {
                        origin: [0, 0],
                        angle: 0
                    }
                }),
                animation.get('.red-line2').animate({
                    duration: 600,
                    delay: 500,
                    timeingFunction: 'linear',
                    'box-unfold': {
                        origin: [0, 0],
                        angle: 0
                    }
                })
            ]);
        }).then(function(item) {
            return animation.get('.fue').animate({
                duration: 400,
                delay: 300
            });
        }).then(function(item) {
            return Promise.all([
                animation.get('.number1').animate({
                    duration: 400,
                    delay: 300,
                    timeingFunction: 'linear',
                    'number': {
                        from: 10,
                        to: 59,
                        format: '%02.%01'
                    }
                }),
                animation.get('.number2').animate({
                    duration: 400,
                    delay: 300,
                    timeingFunction: 'linear',
                    'number': {
                        from: 10,
                        to: 61,
                        format: '%02.%01'
                    }
                })
            ]);
        });
}