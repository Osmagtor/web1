// IMPORTS

import $ from 'https://cdn.jsdelivr.net/npm/jquery/+esm'; // jQuery (via jsDelivr)
import LoadingScreen from '../modules/loading.js';

// MAIN

const ld = new LoadingScreen(() => {

    $('.loading__screen').fadeOut(500)

    // Image gallery logic

    const imgs = $('.gallery__image');
    const delay = 5000;
    let i = 0;

    setInterval(() => {
        i = i === imgs.length - 1 ? 0 : i + 1;
        imgs.css('transform', `translateX(-${i * 100}%)`);
    }, delay);

    // Animating the 'about' text

    // CSS transitions could be used instead, but this allows for more control
    // over an animation that is not triggered by user interaction

    $('.text').css({ transform: 'translate(-50%, 200%)' });
    $('.text__paragraph').css({ opacity: 0 });

    $('.text').css({ transform: 'translate(-50%, 200%)' }).animate({}, 0, function () {
        $(this).css({ transition: 'transform 1s', transform: 'translate(-50%, -50%)' }).on('transitionend', function () {
            $('.text__paragraph').each((i, e) => {
                setTimeout(() => {
                    $(e).animate({ opacity: 0 }, 0).animate({ opacity: 1 }, 500);
                }, 500 * i)
            });
        });
    });
}, 500, 2500);