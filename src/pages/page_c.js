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
        <div class="el text anime box-unfold" 
            style="${IF_TEMPLATE(ss, 
                elementRect(600,152,19,493),
                elementRect(600,152,19,293))}">
            <img src="${path}/text.gif"/>
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
        return animation.get('.blue2').animate({
            duration: 300,
            delay: 300
        }).then(function() {
            $page.find('.blue2').toggleClass('fade-in fade-out');
        })
    }).then(function(item) {
        return animation.get('.blue2').animate({
            duration: 300,
            delay: 100
        });
    });
}
