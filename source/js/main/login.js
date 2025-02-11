// IMPORTS

import justValidate from 'https://cdn.jsdelivr.net/npm/just-validate@4.3.0/+esm' // Just Validate (via jsDelivr)
import $ from 'https://cdn.jsdelivr.net/npm/jquery/+esm'; // jQuery (via jsDelivr)
import LoadingScreen from '../modules/loading.js';

// MAIN

const ld = new LoadingScreen(() => {

    // Animating the 'login' element

    // CSS transitions could be used instead, but this allows for more control
    // over an animation that is not triggered by user interaction

    $('.login').css({ top: '1000px' });

    $('.login').css({ top: '1000px' }).animate({}, 0, function () {
        $(this).css({ transition: 'top 1s', top: '0px' });
    });

    // Get the form elements

    const boxes = $('.login__box');
    const vLogin = new justValidate(boxes.first()[0]);
    const vSignup = new justValidate(boxes.last()[0]);

    // Function to refresh the forms

    const refresh = () => {
        vLogin.refresh();
        vSignup.refresh();

        boxes.find('input').val('');
    };

    // Refresh the forms on load

    refresh();

    // Add event listeners to the buttons to switch between the login and signup forms

    boxes.first().find('.login__box__signup__button').on('click', (ev) => {
        ev.preventDefault();
        boxes.css('transform', 'translateX(-100vw)');

        refresh();
        document.title = 'FE Stats - Signup';
    });

    boxes.last().find('.login__box__signup__button').on('click', (ev) => {
        ev.preventDefault();
        boxes.css('transform', 'translateX(0vw)');

        refresh();
        document.title = 'FE Stats - Login';
    });

    // Add event listeners to the password fields to toggle the visibility of the password

    $('.login__box__show-password').on('click', (ev) => {
        ev.preventDefault();

        const e = $(ev.target);
        const input = e.parent().find('input');

        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            e.css('background-image', 'url(../../../img/interface/eye-on.svg)');
        } else {
            input.attr('type', 'password');
            e.css('background-image', 'url(../../../img/interface/eye-off.svg)');
        }
    });

    // Prepare the forms for validation using JustValidate

    vLogin.addField('#login__box__email', [
        {
            rule: 'required',
            errorMessage: 'Email is required'
        },
        {
            rule: 'email',
            errorMessage: 'Introduce a valid email: name@domain.tld'
        }
    ]).addField('#login__box__password', [
        {
            rule: 'required',
            errorMessage: 'Password is required'
        },
        {
            rule: 'minLength',
            value: 8,
            errorMessage: 'Password must be at least 8 characters long'
        },
        {
            rule: 'customRegexp',
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMessage: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }
    ]).onSuccess(() => {
        alert('Nothing yet');
    });

    vSignup.addField('#signup__box__name', [
        {
            rule: 'required',
            errorMessage: 'Name is required'
        },
        {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Name should be at least 2 characters long'
        }
    ]).addField('#signup__box__surname', [
        {
            rule: 'required',
            errorMessage: 'Surname is required'
        },
        {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Surname should be at least 2 characters long'
        }
    ]).addField('#signup__box__birthdate', [
        {
            rule: 'required',
            errorMessage: 'Date is required'
        },
        {
            validator: (value) => {
                return value !== '';
            },
            errorMessage: 'Date is required'
        }
    ]).addField('#signup__box__email', [
        {
            rule: 'required',
            errorMessage: 'Email is required'
        },
        {
            rule: 'email',
            errorMessage: 'Introduce a valid email: name@domain.tld'
        }
    ]).addField('#signup__box__password', [
        {
            rule: 'required',
            errorMessage: 'Password is required'
        },
        {
            rule: 'minLength',
            value: 8,
            errorMessage: 'Password must be at least 8 characters long'
        },
        {
            rule: 'customRegexp',
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMessage: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }
    ]).addField('#signup__box__password2', [
        {
            rule: 'required',
            errorMessage: 'Password confirmation is required'
        },
        {
            validator: (value, fields) => { return value === fields['#signup__box__password2'].elem.value; },
            errorMessage: 'Passwords do not match'
        }
    ]).onSuccess((ev) => {
        alert('Nothing yet');
    });
}, 500, 2500);