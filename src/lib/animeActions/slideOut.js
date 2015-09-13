import './slideOut.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';
import {transition} from '../util';

/*
    'slide-out': {
        offset: '5%', //  增减的偏移量，0~100%,
        to: 'top' // top/bottom/left/right
    }
*/

const POS_MAP = {
    'top': ['top', -1],
    'bottom': ['top', 1],
    'left': ['left', -1],
    'right': ['left', 1]
};

export default function slideIn($element, options) {
    return $element.hasClass('slide-out') && (
        function() {
            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            var slideOutOpt = options['slide-out'] || {};
            var offset = parseFloat(slideOutOpt.offset || '10%') / 100;
            var to = slideOutOpt.to || 'top';

            var elStyle = $element[0].style;
            var origin = {
                left: parseFloat(elStyle.left) / 100,
                top: parseFloat(elStyle.top) / 100
            };

            return ready.then(function() {
                var [prop, sign] = POS_MAP[to];

                $element.css({
                    display: 'block',
                    [prop]: origin[prop] * 100 + '%'
                });

                return (new Promise(function(resolve, reject) {
                    transition($element[0], {
                        [prop]: (origin[prop] + offset * sign) * 100 + '%'
                    }, {
                        prop: prop,
                        duration: options.duration || 400,
                        timingFunction: options.timingFunction || 'easeIn',
                        delay: 0,
                        complete: resolve
                    });
                }));
            });
        }
    )();
}