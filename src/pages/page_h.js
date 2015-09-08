import './page_h.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_h';

    return `
        <div class="bg"><img src="${path}/bg.jpg"></div>
        <div class="el text anime fade-in" style="${elementRect(597,65,22,203)}">
            <img src="${path}/text.gif">
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