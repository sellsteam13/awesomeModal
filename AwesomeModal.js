/**
 * @desc This is AwesomeModal.js
 * @version 1.0.0
 * @example let AwesomeModalJS = new AwesomeModal(element, {config});
 */

export default class AwesomeModal {
    constructor(modalElement = '.awesomeModal', config = {}) {

        // Assigning config values to properties
        this.modal = typeof modalElement === "string" ? document.querySelector(modalElement) : modalElement;
        this.overlay = null;
        this.overlayClass = config.overlayClass ? "awesomeModal__overlay " + config.overlayClass : "awesomeModal__overlay";
        this.overlayBackground = config.overlayBackground ? config.overlayBackground : 'rgba(0,0,0,.1)';
        this.overlayCloseAbleDisabled = config.overlayCloseAbleDisabled ? config.overlayCloseAbleDisabled : false;
        this.modalAnimateDisabled = config.modalAnimateDisabled ? config.modalAnimateDisabled : false;
        this.ANIMATION_DURATION = 200;

        // Custom events
        this.openEvent = new CustomEvent("open");
        this.closeEvent = new CustomEvent("close");

        // Init
        this.create({
            overlayClass: this.overlayClass,
            overlayBackground: this.overlayBackground,
            overlayCloseAbleDisabled: this.overlayCloseAbleDisabled
        });
    };
    // Create modal
    create(overlayOptions) {
        this.overlay = document.createElement('div')
        this.overlay.setAttribute('class', overlayOptions.overlayClass)
        this.overlay.setAttribute('style', `background: ${overlayOptions.overlayBackground}`)
        this.overlay.insertAdjacentElement('afterbegin', this.modal)
        document.body.insertAdjacentElement('beforeend', this.overlay)
        if (!overlayOptions.overlayCloseAbleDisabled) {
            document.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close()
                }
            })
        }
    };
    // Open modal
    open() {
        if (this.overlay !== null) {
            const otherOverlays = [...document.querySelectorAll('.awesomeModal__overlay.is-opened')];
            let ANIMATION_DELAY = 0;
            if (otherOverlays.length > 0) {
                ANIMATION_DELAY += (this.ANIMATION_DURATION + 100);
                otherOverlays.forEach(x => {
                    x.classList.remove('is-opened');
                    x.classList.remove('is-animating');
                    setTimeout(() => {
                        x.style.display = 'none';
                        x.childNodes[0].dispatchEvent(this.closeEvent);
                    }, this.ANIMATION_DURATION);
                });
            }
            setTimeout(() => {
                this.scrollDisable();
                this.modal.dispatchEvent(this.openEvent);
                this.overlay.style.display = 'flex';
                setTimeout(() => {
                    this.overlay.classList.add('is-opened');
                    // if animation disabled
                    if (!this.modalAnimateDisabled) this.overlay.classList.add('is-animating');
                }, 50)
            }, ANIMATION_DELAY)
        }
    };
    // Close modal
    close() {
        if (this.overlay !== null) {
            // if animation disabled
            if (!this.modalAnimateDisabled) this.overlay.classList.remove('is-animating');
            this.overlay.classList.remove('is-opened');
            setTimeout(() => {
                this.overlay.style.display = 'none';
                this.scrollEnable();
                this.modal.dispatchEvent(this.closeEvent);
            }, this.ANIMATION_DURATION + 50)
        }
    };
    // Disable page scroll
    scrollDisable() {
        let $body = document.body;
        window.scrollPosition = window.pageYOffset;
        window.tmpScrollPos = -1 * window.scrollPosition;
        $body.style.overflow = 'hidden';
        $body.style.position = 'fixed';
        $body.style.top = window.tmpScrollPos + 'px';
        $body.style.width = '100%';
    };
    // Enable page scroll
    scrollEnable() {
        let $body = document.body;
        $body.style.removeProperty('overflow');
        $body.style.removeProperty('position');
        $body.style.removeProperty('top');
        $body.style.removeProperty('width');
        window.scrollTo({
            top: -1 * tmpScrollPos,
            behavior: "instant"
        });
    }

}