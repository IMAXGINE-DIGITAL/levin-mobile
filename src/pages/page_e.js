import './page_e.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';
import rangeslider from '../lib/rangeslider';
rangeslider($);

var path = 'images/page_e';

export function render() {
    return `
        <div class="bg">
            <img src="${path}/bg.jpg">
        </div>
        <div class="el text anime fade-in" style="${elementRect(628,105,0,344)}">
            <img src="${path}/text.gif"/>
        </div>
        <div class="el car1 anime box-unfold" style="${elementRect(640,256,0,762)}">
            <img src="${path}/car1.jpg"/>
        </div>
        <div class="el car2 anime box-unfold" style="${elementRect(640,256,0,762)}">
            <img src="${path}/car2.jpg"/>
        </div>
        <div class="el number1 anime fade-in" style="${elementRect(440,99,35,285)}">
            1660mm
        </div>
        <div class="el ruler anime fade-in" style="${elementRect(640,80,0,1014)}">
            <img src="${path}/ruler.png"/>
        </div>
        <div class="el range anime fade-in" style="${elementRect(285,68,289,983)}">
            <input type="range" value="0" min="0" max="100"/>
            <img src="${path}/circle.png" />
        </div>
    `;
}

export function show($page) {
    var animation = $page.animation();

    var ready = defer();
    
    return animation.then(function(item) {
            return animation.get('.text').animate({
                duration: 600,
                delay: 200
            });
        }).then(function(item) {
            return animation.get('.car1').animate({
                duration: 800,
                delay: 400,
                'box-unfold': {
                    origin: [0, 0],
                    angle: 0
                }
            });
        }).then(function(item) {
            return animation.get('.ruler').animate({
                duration: 600,
                delay: 200
            });
        }).then(function(item) {
            var car1Action;

            var car2Action = animation.get('.car2')
                    .action('box-unfold', {
                        origin: [0, 0],
                        angle: 0
                    });

            var number1Action = animation.get('.number1')
                    .action('number', {
                        from: 1660,
                        to: 2700,
                        format: '%04%03%02%01mm'
                    });

            var slideCompelte = false;
            $page.find('.range input[type="range"]').rangeslider({
                polyfill: false,
                rangeClass: 'rangeslider',
                fillClass: 'rangeslider__fill',
                handleClass: 'rangeslider__handle',

                // Callback function
                onSlide: function(position, value) {
                    ready.promise.then(function() {
                        if (!slideCompelte) {
                            car2Action.frame(value / 100, value / 100);
                        } else {
                            car1Action.frame(1 - value / 100, 1 - value / 100);
                        }
                        number1Action.frame(value / 100, value / 100);
                    });
                },

                // Callback function
                onSlideEnd: function(position, value) {
                    if (slideCompelte) return;
                    slideCompelte = true;

                    ready.promise.then(function() {
                        if (value === 100) {
                            car2Action.done();

                            $page.find('.car1').hide();                            

                            $page.find('.car2')
                                .removeClass('box-unfold')
                                .addClass('box-fold');
                        
                            animation.get('.car2').animate({
                                duration: 800,
                                delay: 400,
                                'box-fold': {
                                    origin: ['100%', 0],
                                    angle: 0
                                }
                            }).then(function() {
                                $page.find('.car1').show();
                                $page.find('.car2').hide();

                                car1Action = animation.get('.car1')
                                    .action('box-unfold', {
                                        origin: ['100%', 0],
                                        angle: 0
                                    });
                            });
                        }
                    });
                }
            })
            
            $page.find('.range .rangeslider__handle')
                .append($page.find('.range img'));

            return animation.get('.range').animate({
                duration: 600,
                delay: 200
            });
        }).then(function(item) {
            return animation.get('.number1').animate({
                duration: 600,
                delay: 200
            });
        }).then(function() {
            return ready.resolve();
        });
}