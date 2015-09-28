import './page_z.less';
import $ from 'jquery';
import {Promise, defer} from '../lib/promise';
import * as page from '../lib/page';
import {elementRect} from '../lib/util';
import '../lib/animation';

export function render() {
    var path = 'images/page_z';

    return `
        <div class="el form-wrap" style="${elementRect(640,1136,0,0)}">
            <iframe id="form" framebolder="0" src="form/camryNodListed.html">
        </div>
    `;
}

export function show($page) {
    var contentDocument = $('#form')[0].contentDocument;
    var $contentDoc = $(contentDocument);

    $contentDoc.find('.header, .footer').remove();
    $contentDoc.find('html, body').css({
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        });

    // var $formT = $contentDoc.find('.formT');
    // $formT.css({
    //     position: 'absolute',
    //     marginLeft: '10%',
    //     bottom: 5
    // });

    // if (!!window.navigator.userAgent.match(/iPhone/)) {

    // }

    // var top = ($contentDoc.height() - $formT.height()) / 2
    // $contentDoc.find('body').css({
    //     paddingTop: top * 2
    // });
    // $formT.css({
    //     position: 'absolute',
    //     marginLeft: '10%'
    //     // margin: 'auto',
    //     // paddingTop: Math.max(50, paddingTop)
    // });

}