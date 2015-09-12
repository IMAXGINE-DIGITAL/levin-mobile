import {Promise, defer} from './promise';
import * as page from './page';
import fa from './frameAnimation';

var queue = Promise.resolve();

export function scroll($pageRoot, name) {
    var init = Promise.resolve();

    if (!page.has(name)) {
        init = page.add(name);
    }

    queue = Promise.all([init, queue])
        .then(function(ret) {
            var curpage = page.get(name);

            var lastname = ret[1];
            if (lastname) {
                var lastpage = page.get(lastname);
                var sign = page.indexOf(name) > page.indexOf(lastname) ? 1 : -1;

                // var height = lastpage.$root.height();

                // curpage.$root.css({
                //     display: 'block',
                //     webkitTransform: 'translateY(' + sign * height + 'px)',
                //     msTransform: 'translateY(' + sign * height + 'px)',
                //     transform: 'translateY(' + sign * height + 'px)'
                // });

                // return fa(700, 'ease', function(i1, i2) {
                //     $pageRoot.css({
                //         display: 'block',
                //         webkitTransform: 'translateY(' + (-sign * height * i2) + 'px)',
                //         msTransform: 'translateY(' + (-sign * height * i2) + 'px)',
                //         transform: 'translateY(' + (-sign * height * i2) + 'px)'
                //     });
                // }).play().then(function() {
                //     lastpage.$root.css({
                //         display: 'none'
                //     });
                //     curpage.$root.css({
                //         transform: ''
                //     });
                //     $pageRoot.css({
                //         transform: ''
                //     });
                // });


                curpage.$root.css({
                    display: 'block',
                    top: sign * 100 + '%'
                });
                
                return new Promise(function(resolve, reject) {
                    $pageRoot.animate({
                        top: (-100 * sign) + '%'
                    }, {
                        duration: 700,
                        complete: function() {
                            lastpage.$root.css({
                                display: 'none'
                            });
                            curpage.$root.css({
                                top: ''
                            });
                            $pageRoot.css({
                                top: ''
                            });
                            resolve();
                        }
                    });
                });
            } else {
                curpage.$root.css({
                    display: 'block'
                });
            }
        })
        .then(function() {
            return page.show(name);
        }).then(function() {
            return name;
        });

    return queue;
}