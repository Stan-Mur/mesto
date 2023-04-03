import { ESCAPE_BUTTON } from '../index.js';

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }
    openPopup() {
        this._popup.classList.add('popup_change_display');
        document.addEventListener('keydown', this._handleEscClose);
    };
    closePopup() {
        this._popup.classList.remove('popup_change_display');
        document.removeEventListener('keydown', this._handleEscClose);
    };
    _handleEscClose = (event) => {
        if (event.key === ESCAPE_BUTTON) {
            this.closePopup();
        }
    }
    setEventListeners() {
        this._popup.querySelector('.popup__close-btn').addEventListener('click', () => {
            this.closePopup();
        });

        this._popup.addEventListener('click', (evt) => {
            if (evt.target === this._popup) {
                this.closePopup();
            };
        });
    }
}

