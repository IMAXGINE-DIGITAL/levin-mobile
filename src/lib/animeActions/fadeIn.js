import './fadeIn.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';
import {transition} from '../util';

export default function fadeIn($element, options) {
    return $element.hasClass('fade-in') && (
        function() {
            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            return ready.then(function() {
                $element.css({
                    display: 'block',
                    opacity: 0
                });

                return new Promise(function(resolve, reject) {
                    transition($element[0], {
                        opacity: 1
                    }, {
                        prop: 'opacity',
                        duration: options.duration || 400,
                        timingFunction: options.timingFunction || 'easeIn',
                        delay: 0,
                        complete: resolve
                    });
                });
            });
        }
    )();
}