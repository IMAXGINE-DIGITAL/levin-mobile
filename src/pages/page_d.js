import './page_d.less';
import * as jQuery from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

var $ = jQuery.noConflict();

export function render() {
    var path = 'images/page_d';

    return `
        <div class="wrap">
            <div class="bg"><img src="${path}/bg.jpg"></div>
            <div class="el wind anime box-unfold" style="${elementRect(1568,454,-350,494)}">
                <img src="${path}/wind.png">
            </div>
            <div class="el text anime fade-in text-wrap" style="${elementRect(589,140,18,875)}">
                <span class="text_a" style="${elementRect(589,95,0,0,[589,140])}">
                    高性能空调滤芯
                </span>
                <span class="text_b" style="${elementRect(589,45,0,105,[589,140])}">
                    PM2.5隔离效率达94%
                </span>
            </div>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.wind').animate({
                duration: 600,
                'box-unfold': {
                    origin: [0.36, 0],
                    angle: 12
                }
            });
        }).then(function(item) {
            return animation.get('.text').animate({
                duration: 600,
                delay: 300
            });
        });
}