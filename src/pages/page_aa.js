import './page_a.less';
import $ from 'jquery';
import {
    Promise, defer
}
from '../lib/promise';
import * as page from '../lib/page';
import {
    elementRect
}
from '../lib/util';
import '../lib/animation';
/**
 * 400 × 269
 *                 <div class="el car anime zoom" style="${elementRect(640,430,-20,460)}">

 */
export function render() {
    var path = 'images/page_aa';

    return `
        <div class="bg" style="${elementRect(640,1136,0,0)}">
            <img src="${path}/bg.jpg" />
        </div>
        <div class="el car anime zoom" style="${elementRect(100,67,255,620)}">
            <img src="${path}/car.png" />
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    return animation.then(function() {
        $page.find('.car').show();
        // return animation.get('.car').animate({
        //     duration: 400,
        //     'slide-in': {
        //         offset: '10%',
        //         from: 'top'
        //     }
        // }).then(function(item){
        //     $page.find('.car')
        //         .removeClass('slide-in')
        //         .addClass('zoom');
        // })
    }).then(function() {
        return animation.get('.car').animate({
            duration: 400,
            delay: 200,
            'zoom': {
                from: '100%',
                to: '1000%'
            }
        });
    })
}
