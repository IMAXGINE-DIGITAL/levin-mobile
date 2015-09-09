import './page_f.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_f';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el trigle1 anime box-unfold" style="${elementRect(393,389,170,535)}">
            <img src="${path}/trigle1.png">
        </div>
        <div class="el trigle2 anime box-unfold" style="${elementRect(393,473,170,535)}">
            <img src="${path}/trigle2.png">
        </div>
        <div class="el shadow anime fade-in" style="${elementRect(388,23,21,942)}">
            <img src="${path}/shadow.jpg">
        </div>
        <div class="el text2 anime fade-in" style="${elementRect(270,93,41,490)}">
            <img src="${path}/text2.png">
        </div>
        <div class="el text3 anime fade-in" style="${elementRect(219,91,411,829)}">
            <img src="${path}/text3.png">
        </div>
        <div class="el text4 anime fade-in" style="${elementRect(277,92,90,970)}">
            <img src="${path}/text4.png">
        </div>
        <div class="el seat anime fly-in" style="${elementRect(450,603,70,348)}">
            <img src="${path}/seat.png">
        </div>
        <div class="el seat-back1 anime fade-in" style="${elementRect(264,489,280,368)}">
            <img src="${path}/seat-back1.png">
        </div>
        <div class="el seat-back2 anime fade-in" style="${elementRect(322,474,292,399)}">
            <img src="${path}/seat-back2.png">
        </div>
        <div class="el text1 anime box-unfold" style="${elementRect(459,127,41,283)}">
            <img src="${path}/text1.png">
        </div>
    `;
}


//2.8125%
//10.9375
export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.shadow').animate({
                duration: 400
            });
        }).then(function(item) {
            return animation.get('.seat').animate({
                duration: 700,
                timingFunction: 'easeOut',
                'fly-in': {
                    from: 'bottom'
                }
            }).then(function() {
                $page.find('.seat')
                    .removeClass('fly-in')
                    .addClass('slide-out')
            });
        }).then(function(item) {
            return animation.get('.seat').animate({
                duration: 700,
                delay: 400,
                timingFunction: 'easeOut',
                'slide-out': {
                    to: 'left',
                    offset: '8.125%'
                }
            });
        }).then(function(item) {
            return animation.get('.text1').animate({
                duration: 400,
                delay: 300,
                'box-unfold': {
                    origin: ['50%', '50%'],
                    angle: 0
                }
            });
        }).then(function(item) {
            return animation.get('.text2').animate({
                duration: 400,
                delay: 500
            });
        }).then(function(item) {
            return animation.get('.seat-back1').animate({
                duration: 400,
                delay: 100
            });
        }).then(function(item) {
            return animation.get('.seat-back2').animate({
                duration: 400,
                delay: 100
            });
        }).then(function(item) {
            return animation.get('.trigle1').animate({
                duration: 400,
                delay: 300,
                'box-unfold': {
                    origin: [0, 0],
                    angle: 60
                }
            });
        }).then(function(item) {
            return animation.get('.text3').animate({
                duration: 400
            });
        }).then(function(item) {
            return animation.get('.trigle2').animate({
                duration: 600,
                delay: 300,
                'box-unfold': {
                    origin: [0, 0],
                    angle: 15
                }
            });
        }).then(function(item) {
            return animation.get('.text4').animate({
                duration: 400
            });
        });
}