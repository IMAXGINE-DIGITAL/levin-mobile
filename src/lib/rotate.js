import './rotate.less';
import $ from 'jquery';
import {Promise, defer} from './promise';
import * as viewport from './viewport';
import {elementRect} from './util';

var deferred = defer();

export function ready() {
    return deferred.promise;
}

var path = 'images/rotate';

function render() {
    return `
        <div id="rotate">
            <div class="wrap">
                <div class="center-wrap">
                    <img src="${path}/phone.png" />
                    <p>竖屏访问最佳哦</p>
                </div>
            </div>
        </div>
    `;
}

viewport.ready().then(function ($viewport) {
    var $rotate = $(render());
    $(document.body).append($rotate);

    deferred.resolve($rotate);
});