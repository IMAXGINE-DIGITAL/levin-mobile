import './page_z.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_z';

    return `
        <div class="bg">
            <img src="${path}/bg.jpg" />
        </div>
        <div class="el form-wrap" style="${elementRect(500,716,70,350)}">
            <iframe id="form" framebolder="0" src="form/camryNodListed.html">
        </div>
    `;
}

export function show($page) {
}