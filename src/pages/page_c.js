import './page_c.less';
import $ from 'jquery';
import { Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render({IF_TEMPLATE}) {
    var path = 'images/page_c';
    var ss = window.fixSmallScreen;

    return `        
        <div class="el bg"">
            <img src="${path}/bg.jpg"/>
        </div>
        <div class="el kuang anime box-unfold" style="${elementRect(640,300,0,744)}">
            <img src="${path}/kuang.png"/>
        </div>
        <div class="el blue1 anime box-unfold" style="${elementRect(640,351,0,710)};">
            <img src="${path}/blue1.jpg"/>
        </div>
        <div class="el text anime box-unfold text-wrap" 
            style="${IF_TEMPLATE(ss, 
                elementRect(600,152,19,493),
                elementRect(600,152,19,343))}">
            <img src="${path}/light.gif" />
            <span class="text_a" style="${elementRect(263,52,0,62,[600,152])}">
                比普通天窗大
            </span>
            <span class="text_b anime number number-text" style="${elementRect(201,105,270,30,[600,152])}">
                15%
            </span>
            <span class="text_c" style="${elementRect(608,34,0,129,[600,152])}">
                窄边框设计,采光充足,增强通透感和车辆空间感。
            </span>
        </div>
        <div class="el blue2 anime fade-in" style="${elementRect(640,351,0,710)}">
            <img src="${path}/blue2.png"/>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function(item) {
        return animation.get('.kuang').animate({
            duration: 400,
            delay: 200,
            'box-unfold': {
                origin: ['20%', 0],
                angle: 15
            }
        })
    }).then(function(item) {
        return animation.get('.blue1').animate({
            duration: 600,
            delay: 300,
            'box-unfold': {
                origin: ['30%', '20%'],
                angle: 15
            }
        })
    }).then(function(item) {
        return animation.get('.text').animate({
            duration: 400,
            delay: 200,
            'box-unfold': {
                origin: ['50%', '50%'],
                angle: 15
            }
        });
    }).then(function(item) {
        return Promise.all([
            animation.get('.blue2').animate({
                duration: 300,
                delay: 300
            }).then(function() {
                $page.find('.blue2').toggleClass('fade-in fade-out');
            }).then(function () {
                return animation.get('.blue2').animate({
                    duration: 300,
                    delay: 100
                });
            }),
            animation.get('.text_b').animate({
                duration: 400,
                delay: 100,
                number: {
                    from: 0,
                    to: 15,
                    format: '%02%01%'
                }
            })
        ]);

    }).then(function(item) {

    });
}
