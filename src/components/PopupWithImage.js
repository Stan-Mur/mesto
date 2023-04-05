import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopupCard = this._popup.querySelector('.popup__modal-img');
        this._titlePopupCard = this._popup.querySelector('.popup__modal-txt');
    }
    openPopup(cardElement) {
        
        const cardImage = cardElement.querySelector('.elements__items-img_template');
        const cardTitle = cardElement.querySelector('.elements__subtitle_template');

        this._imagePopupCard.src = cardImage.src;
        this._imagePopupCard.alt = cardTitle.textContent;
        this._titlePopupCard.textContent = cardTitle.textContent;
        super.openPopup();
    };
}