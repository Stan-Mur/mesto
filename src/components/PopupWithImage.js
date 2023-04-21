import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupCard = this._popup.querySelector(".form-image__image");
    this._titlePopupCard = this._popup.querySelector(".form-image__text");
  }
  openPopup(cardElement) {
   
    const cardImage = cardElement.querySelector(".element__image");
    const cardTitle = cardElement.querySelector(".element__text");

    this._imagePopupCard.src = cardImage.src;
    this._imagePopupCard.textContent = cardTitle.alt;
    this._titlePopupCard.textContent = cardTitle.textContent;
    super.openPopup();
  }
}
