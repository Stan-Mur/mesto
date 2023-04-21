import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupCard = this._popup.querySelector(".form-image__image");
    this._titlePopupCard = this._popup.querySelector(".form-image__text");
  }
  openPopup(name, link) {
    this._imagePopupCard.src = link;
    this._imagePopupCard.textContent = name;
    this._titlePopupCard.textContent = name;
    super.openPopup();
  }
}
