import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    openPopup(cardElement) {
        const imagePopupCard = this._popup.querySelector('.popup__modal-img');
        const titlePopupCard = this._popup.querySelector('.popup__modal-txt');
        const cardImage = cardElement.querySelector('.elements__items-img_template');
        const cardTitle = cardElement.querySelector('.elements__subtitle_template');

        imagePopupCard.src = cardImage.src;
        imagePopupCard.alt = cardTitle.textContent;
        titlePopupCard.textContent = cardTitle.textContent;
        super.openPopup();
    };
}