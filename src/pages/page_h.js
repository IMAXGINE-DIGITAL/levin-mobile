import './page_h.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_h';

    return `
        <div class="wrap">
            <div class="bg"><img src="${path}/bg.jpg"></div>
            <div class="el text anime fade-in text-wrap" style="${elementRect(640,113,22,210)}">
                <span class="text_a" style="${elementRect(620,40,0,5,[640,113])}">
                    博世第9代ABS+EBD+EBA+TRC+VSC主动安全系统
                </span>
                <span class="text_b" style="${elementRect(550,40,0,45,[640,113])}">
                    先进的安全驾驶系统，并对刹车系统定向调教，实现最佳制动感。
                </span>
            </div>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();
    
    return animation.then(function(item) {
            return animation.get('.text').animate({
                duration: 600,
                delay: 300
            });
        });
}