// IMPORTS

import $ from 'https://cdn.jsdelivr.net/npm/jquery/+esm'; // jQuery (via jsDelivr)
import LoadingScreen from '../modules/loading.js';

// MAIN

const ld = new LoadingScreen(() => {

    // Animating the 'block' elements

    // CSS transitions could be used instead, but this allows for more control
    // over an animation that is not triggered by user interaction

    $('.block').each((i, e) => {
        if (i % 2 === 0) {
            $(e).css({ transform: 'translate(-100%, 0%)' });
        } else {
            $(e).css({ transform: 'translate(100%, 0%)' });
        }
    });

    $('.block').each((i, e) => {
        setTimeout(() => {
            if (i % 2 === 0) {
                $(e).css({ transform: 'translate(-100%, 0%)' }).animate({}, 0, function () {
                    $(this).css({ transition: 'transform 1s', transform: 'translate(0%, 0%)' });
                });
            } else {
                $(e).css({ transform: 'translate(100%, 0%)' }).animate({}, 0, function () {
                    $(this).css({ transition: 'transform 1s', transform: 'translate(0%, 0%)' });
                });
            }
        }, 500 * i);
    })
}, 500, 2500);