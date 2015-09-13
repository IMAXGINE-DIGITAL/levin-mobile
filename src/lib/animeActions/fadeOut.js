import './fadeOut.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';
import {transition} from '../util';


export default function fadeOut($element, options) {
    return $element.hasClass('fade-out') && (
        function() {
            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            return ready.then(function() {
                $element.css({
                    display: 'block',
                    opacity: 1
                });

                return new Promise(function(resolve, reject) {
                    transition($element[0], {
                        opacity: 0
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