import {Promise, defer} from './promise';
import * as page from './page';
import fa from './frameAnimation';
import {transition} from './util';

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

                curpage.$root.css({
                    display: 'block',
                    top: sign * 100 + '%'
                });
                
                return new Promise(function(resolve, reject) {
                    transition($pageRoot[0], {
                        top: (-sign * 100) + '%'
                    }, {
                        prop: 'top',
                        duration: 700,
                        timingFunction: 'ease',
                        delay: 0,
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

                    // $pageRoot.animate({
                    //     top: (-100 * sign) + '%'
                    // }, {
                    //     duration: 700,
                    //     complete: function() {
                    //         lastpage.$root.css({
                    //             display: 'none'
                    //         });
                    //         curpage.$root.css({
                    //             top: ''
                    //         });
                    //         $pageRoot.css({
                    //             top: ''
                    //         });
                    //         resolve();
                    //     }
                    // });
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