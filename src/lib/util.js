const WIDTH = 640;
const HEIGHT = 1136;

export function elementRect(width, height, left, top, vp) {
    var w = vp && vp[0] || WIDTH;
    var h = vp && vp[1] || HEIGHT
    return `
        width:${width/w*100}%;
        height:${height/h*100}%;
        left:${left/w*100}%;
        top:${top/h*100}%;
    `
}

export function transferTimingFunction(type) {
    if (type instanceof Array) {
        return 'cubic-bezier(' + type.join(',') + ')';
    } else {
        return type.replace(/[a-z]([A-Z])[a-z]/g, function($1) {
            return $1.replace(/([A-Z])/, '-$1').toLowerCase();
        });
    }
}

export function transition(element, value, properties) {
    var resolved;
    var styles = {};
    var {prop, duration, timingFunction, delay} = properties;
    timingFunction = transferTimingFunction(timingFunction);

    if (prop === 'transform') {
        styles['webkitTransition'] = '-webkit-transform ' + 
                    duration + 'ms ' + timingFunction + ' ' + delay + 'ms';
        styles['transition'] = 'transform ' + 
                    duration + 'ms ' + timingFunction + ' ' + delay + 'ms'; 
    } else {
        styles['webkitTransition'] = 
            styles['transition'] = prop + ' ' + 
                duration + 'ms ' + timingFunction + ' ' + delay + 'ms';
    }

    for (var key in styles) {
        element.style[key] = styles[key];
    }

    function resolveHandler() {
        if (resolved) return;
        resolved = true;

        element.removeEventListener('webkitTransitionEnd', resolveHandler);
        element.removeEventListener('transitionend', resolveHandler);
        for (var key in styles) {
            element.style[key] = '';
        }
        properties.complete();
    }

    element.addEventListener('webkitTransitionEnd', resolveHandler);

    element.addEventListener('transitionend', resolveHandler);

    setTimeout(resolveHandler, duration * 1.1);

    setTimeout(function(){
        for (var key in value) {
            element.style[key] = value[key];
        }
    }, 0);
}