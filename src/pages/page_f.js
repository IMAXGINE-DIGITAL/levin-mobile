import './page_f.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render({IF_TEMPLATE}) {
    var path = 'images/page_f';
    var ss = window.fixSmallScreen;

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="wrap">
            <div class="el trigle1 anime box-unfold" style="${elementRect(393,389,170,535)}">
                <img src="${path}/trigle1.png">
            </div>
            <div class="el trigle2 anime box-unfold" style="${elementRect(393,473,170,535)}">
                <img src="${path}/trigle2.png">
            </div>
            <div class="el shadow anime fade-in" style="${elementRect(388,23,21,942)}">
                <img src="${path}/shadow.jpg">
            </div>
            <div class="el text2 anime fade-in text-wrap" style="${elementRect(270,93,41,490)}">
                <span class="text_a number-text" style="${elementRect(270,60,0,0,[270,93])}">260mm</span>
                <span class="text_b" style="${elementRect(270,30,0,63,[270,93])}">前后滑动&nbsp;&nbsp;</span>
            </div>
            <div class="el text3 anime fade-in text-wrap" style="${elementRect(219,91,411,829)}">
                <span class="text_a number-text" style="${elementRect(219,60,0,0,[219,91])}">83mm</span>
                <span class="text_b" style="${elementRect(219,30,0,61,[296,91])}">垂直调节&nbsp;&nbsp;</span>
            </div>
            <div class="el text4 anime fade-in text-wrap" style="${elementRect(277,92,90,970)}">
                <span class="text_a number-text" style="${elementRect(277,60,0,0,[277,92])}">10mm/<b>个</b></span>
                <span class="text_b" style="${elementRect(277,30,0,62,[277,92])}">滑动锁点&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
            <div class="el text1 anime box-unfold text-wrap" style="${elementRect(459,187,41,283)}">
                <img src="${path}/light.png">
                <span class="text_c number-text" style="${elementRect(459,120,0,0,[459,187])}">6</span>
                <span class="text_d" style="${elementRect(459,120,90,50,[459,187])}">向电动调节座椅</span>
                <span class="text_e" style="${elementRect(459,60,0,127,[459,187])}">不同身高，一样惬意</span>
            </div>
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
            return Promise.all([
                animation.get('.seat').animate({
                    duration: 700,
                    delay: 400,
                    timingFunction: 'easeOut',
                    'slide-out': {
                        to: 'left',
                        offset: '8.125%'
                    }
                }),
                animation.get('.text2').animate({
                    duration: 400,
                    delay: 500
                })
            ]);
        }).then(function(item) {
            return Promise.all([
                animation.get('.seat-back1').animate({
                    duration: 400,
                    delay: 100
                }),
                animation.get('.seat-back2').animate({
                    duration: 400,
                    delay: 500
                }),
                animation.get('.trigle1').animate({
                    duration: 400,
                    delay: 100,
                    'box-unfold': {
                        origin: [0, 0],
                        angle: 60
                    }
                }),
                animation.get('.text3').animate({
                    duration: 400
                })
            ]);
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
            return Promise.all([
                animation.get('.text4').animate({
                    duration: 400
                }),
                animation.get('.text1').animate({
                    duration: 400,
                    delay: 300,
                    'box-unfold': {
                        origin: ['50%', '50%'],
                        angle: 0
                    }
                })
            ]);
        });
}