import "./index.css";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { initialCards } from "./utils/initial-cards.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";

export const ESCAPE_BUTTON = "Escape";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-name",
  submitButtonSelector: ".popup__form-btn",
  inputErrorClass: "popup__form-name_error",
  errorActiveClass: "popup__form-input-error_active",
  infoName: ".profile__title",
  infoJob: ".profile__subtitle",
  elements: ".elements__items",
};

const addSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      addSection.addItem(renderCard(item));
    },
  },
  config.elements
);

const formEditProfileValidator = document.querySelector(".profile__edit-btn");
const formEditProfile = document.querySelector(".popup__form_profile_change");
const formAddCardValidator = document.querySelector(".profile__open-add-card");
const formEditCards = document.querySelector(".popup__form_profile_cards");
const editProfile = new FormValidator(config, formEditProfile);
const addCards = new FormValidator(config, formEditCards);
const popupEditProfile = new PopupWithForm(
  ".popup_type_edit",
  formEditProfileSubmitHandler
);
const popupAddCard = new PopupWithForm(
  ".popup_type_new-card",
  formEditCardsSubmitHandler
);
const popupImage = new PopupWithImage(".popup_type_images");
const userInfo = new UserInfo(config);
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.job;

function renderCard(item) {
  const card = new Card(item, ".add-to-card", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(elementImage) {
  popupImage.openPopup(elementImage);
}

function formEditProfileSubmitHandler(evt, data) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userInfo.setUserInfo(data);
  popupEditProfile.closePopup();
}

function formEditCardsSubmitHandler(evt, data) {
  evt.preventDefault();
  addSection.addItem(renderCard(data));
  popupAddCard.closePopup();
  addCards.toggleButtonState();
}

formEditProfileValidator.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  editProfile.toggleButtonState();
  popupEditProfile.openPopup();
});

formAddCardValidator.addEventListener("click", () => {
  popupAddCard.openPopup();
  formEditCards.reset();
  addCards.toggleButtonState();
});

addSection.renderItems();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
addCards.enableValidation();
editProfile.enableValidation();
addCards.toggleButtonState();
editProfile.toggleButtonState();
