import './flyIn.less';
import $ from 'jquery';
import {Promise, delay} from '../promise';
import fa from '../frameAnimation';
import {transition} from '../util';


/*
'fly-in': {
    from: 'top' // top/bottom/left/right
}
*/
const POS_MAP = {
    'top': ['top', -1],
    'bottom': ['top', 1],
    'left': ['left', -1],
    'right': ['left', 1]
};

export default function flyIn($element, options) {
    return $element.hasClass('fly-in') && (
        function() {
            var elWidth = $element.width();
            var elHeight = $element.height();

            var $children = $element.children();
            var $wrap = $('<div></div>')
                    .append($children)
                    .appendTo($element);

            var ready = Promise.resolve();

            if (options.delay) {
                ready = delay(options.delay);
            }

            var flyInOpt = options['fly-in'] || {};
            var from = flyInOpt.from || 'top';

            return ready.then(function() {
                var [prop, sign] = POS_MAP[from];

                $wrap.css({
                    display: 'block',
                    [prop]: sign * 100 + '%'
                });

                return (new Promise(function(resolve, reject) {
                    transition($wrap[0], {
                        [prop]: 0
                    }, {
                        prop: prop,
                        duration: options.duration || 400,
                        timingFunction: options.timingFunction || 'easeIn',
                        delay: 0,
                        complete: resolve
                    });
                }));
            }).then(function() {
                $children.css({
                    display: 'block'
                }).appendTo($element);
                $wrap.remove();
            });

            return ready;
        }
    )();
}