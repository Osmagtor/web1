import $ from 'https://cdn.jsdelivr.net/npm/jquery/+esm';

class LoadingScreen {

    #html; // The jQuery object of the loading screen
    #callback; // The function to execute once the page has loaded and the loading screen has been removed
    #animationDuration; // The duration of the fade in/out animation
    #animationDelay; // The delay after which to remove the loading screen
    #elementsToHide; // The elements to hide when the loading screen is displayed

    /**
     * @param {Function} callback The function to execute once the page has loaded and the loading screen has been removed
     * @param {Number} animationDuration The duration of the fade in/out animation
     * @param {Number} delay The delay after which to remove the loading screen
     */
    constructor(callback, animationDuration = 500, delay = 0) {
        this.#html = $('#loading__screen');
        this.#elementsToHide = $('header, main, footer');

        this.#callback = callback;
        this.#animationDuration = animationDuration;
        this.#animationDelay = delay;

        this.#addListeners();
    }

    #addListeners() {

        // Detecting page load

        $(document).ready(() => {
            console.log('Page loaded');

            setTimeout(() => {
                this.#callback();
                this.#off();
            }, this.#animationDelay);
        });

        // Detecting page redirection/reload

        $(window).on('beforeunload', () => {
            console.log('Page is about to be unloaded');

            this.#html.find('.loading__screen__text__message').text('Reloading charts and statistics');
            this.#on();
        });
    }

    #on() {
        console.log('Showing loading screen');

        this.#html.fadeIn(this.#animationDuration, () => {
            this.#elementsToHide.hide();
        });
    }

    #off() {
        console.log('Hiding loading screen');

        this.#html.fadeOut(this.#animationDuration, () => {
            this.#elementsToHide.show();
        });
    }
}

export default LoadingScreen;