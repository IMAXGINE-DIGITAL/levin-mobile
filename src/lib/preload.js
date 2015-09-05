import $ from 'jquery';
import imgpreloader from './imgpreloader';
imgpreloader($);

import {Promise, defer} from '../lib/promise';
import imagelist from '../imagelist';

var a = $('<a></a>');
function getUrl(path) {
    return a.attr('href', path).attr('href');
}

var loaderDeferred = defer();
var doneDeferred = defer();

export function done() {
    return doneDeferred.promise;
}

var images = {};
export function getImage(src) {
    if (images[src]) {
        return images[src].promise;
    } else {
        return Promise.reject(src);
    }
}

var progressHandler = [];
export function onprogress(fn) {
    progressHandler.indexOf(fn) < 0 && progressHandler.push(fn);
}

export default function preloadImags() {
    imagelist.forEach(function(src) {
        images[getUrl(src)] = defer();
    });

    var loader = $.imgpreloader({
        paths: imagelist
    });

    loader.progress(function($image, 
            $allImages, 
            $properImages, 
            $brokenImages, 
            isBroken, 
            percentage) {
        var that =  this;
        var args = arguments;

        images[$image.attr('src')].resolve($image);
        progressHandler.forEach(function(fn) {
            fn.apply(that, args);
        });
    });

    loader.done(function($allImages) {
        doneDeferred.resolve(images);
    });

    loaderDeferred.resolve(loader);

    return module.exports;
}