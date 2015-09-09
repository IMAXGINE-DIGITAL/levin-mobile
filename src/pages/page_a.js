import './page_a.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_a';

    return `
        <div class="bg">
            <img src="${path}/bg.jpg" />
        </div>
        <div class="el car anime slide-in" style="${elementRect(627,268,0,734)}">
            <img src="${path}/car.png" />
        </div>
        <div class="el light anime box-unfold" style="${elementRect(240,48,69,799)}">
            <img src="${path}/light.png" />
        </div>
        <div class="el eagle anime fly-in" style="${elementRect(309,108,0,529)}">
            <img src="${path}/eagle.png" />
        </div>
        <div class="el text anime fade-in" style="${elementRect(554,141,13,339)}">
            <img src="${path}/text.png" />
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
        return animation.get('.car').animate({
            duration: 800,
            timingFunction: 'easeOut',
            'slide-in': {
                offset: '100%',
                from: 'right'
            }
        });
    }).then(function() {
        return animation.get('.light').animate({
            duration: 600,
            'box-unfold': {
                origin: [0, 0],
                angle: 0
            }
        });
    }).then(function() {
        return animation.get('.eagle').animate({
            duration: 1000,
            timingFunction: [0,0,0,1],
            'fly-in': {
                from: 'right'
            }
        });
    }).then(function() {
        return animation.get('.text').animate({
            duration: 400
        });
    });
}