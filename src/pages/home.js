import './home.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';
import * as preload from '../lib/preload';

var path = 'images/home';
var logoImg = require(`../../images/logo`);
var lightImg = require(`../../images/light`);

export function render() {
    return `
        <div class="bg"></div>
        <div class="el logo anime zoom" style="${elementRect(440,69,106,253)}">
            <img src="${logoImg}" />
        </div>
        <div class="el light anime box-unfold" style="${elementRect(264,43,82,279)}">
            <img src="${lightImg}" />
        </div>
        <div class="el car anime fade-in" style="${elementRect(591,350,49,434)}">
            <img src="${path}/car.jpg"/>
        </div>
        <div class="el left-btn anime fade-in" style="${elementRect(269,407,0,729)}">
            <img src="${path}/left-btn.png"/>
        </div>
        <div class="el right-btn anime fade-in" style="${elementRect(263,442,377,694)}">
            <img src="${path}/right-btn.png"/>
        </div>
        <div class="el next anime flash" style="${elementRect(189,68,226,1052)}">
            <img src="${path}/next.gif"/>
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    $page.find('.next').on('tap', function() {
        $(document).trigger('pagechange', 'next');
    });

    $page.find('.left-btn').on('tap', function() {
        // TODO
    });

    $page.find('.right-btn').on('tap', function() {
        // TODO
    });

    return animation.then(function() {
        return animation.get('.logo').animate({
            duration: 700,
            timingFunction: 'easeOut',
            zoom: {
                from: '400%'
            }
        });
    })
    .then(function() {
        var {frame, done} = animation.get('.light')
            .action('box-unfold', {
                origin: [0, 0],
                angle: 0
            });

        var complete = 100;

        return Promise.race([
            new Promise(function(resolve, reject) {
                var firstPercentage;

                preload.onprogress(function($image, 
                    $allImages, 
                    $properImages, 
                    $brokenImages, 
                    isBroken, 
                    percentage) {
                    if (!firstPercentage) {
                        firstPercentage = percentage;
                    }

                    var value = Math.min(percentage, complete);
                    if (value === complete) {
                        resolve();
                    } else {
                        var ratio = (percentage - firstPercentage) / 
                                    (complete - firstPercentage);
                        frame(ratio, ratio);
                    }
                });
            }),
            preload.done()
        ]).then(function() {
            return frame(1, 1);
        });
    })
    .then(function() {
        return Promise.all([
            animation.get('.car').animate({
                duration: 500,
                timingFunction: 'easeOut'
            }),
            animation.get('.left-btn').animate({
                duration: 400,
                timingFunction: 'easeOut'
            }),
            animation.get('.right-btn').animate({
                duration: 400,
                timingFunction: 'easeOut'
            })
        ]);
    }).then(function() {
        return animation.get('.next').animate({
            delay: 200,
            flash: {
                loop: Infinity,
                interval: 800
            }
        })
    });
}