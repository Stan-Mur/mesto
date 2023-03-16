import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/initial-cards.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-name",
  submitButtonSelector: ".popup__form-btn",
  inputErrorClass: "popup__form-name_error",
  errorActiveClass: "popup__form-input-error_active",
};

const popupEditProfile = document.querySelector(".popup_type_edit");
const openEditProfilePopupBtn = document.querySelector(".profile__edit-btn");
const closeEditProfilePopupBtn = document.querySelector(
  ".popup__close-btn_profile"
);
const formEditProfile = document.querySelector(".popup__form_profile_change");
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.about;
const userName = document.querySelector(".profile__title");
const userProfession = document.querySelector(".profile__subtitle");
const popupNewCard = document.querySelector(".popup_type_new-card");
const openAddCardPopupBtn = document.querySelector(".profile__open-add-card");
const closeAddCardPopupBtn = document.querySelector(".popup__close-btn_cards");
const popupBigImage = document.querySelector(".popup_type_images");
const closeImagePopupBtn = document.querySelector(".popup__close-btn_img");
const formEditCards = document.querySelector(".popup__form_profile_cards");
const cardsContainer = document.querySelector(".elements__items");
const popups = document.querySelectorAll(".popup");
const disabledBtn = document.querySelector(".popup__form-btn-cards");
const editProfile = new FormValidator(config, formEditProfile);
const addCards = new FormValidator(config, formEditCards);
const inputName = document.querySelector("#titleInput");
const inputLink = document.querySelector("#imageInput");
const popupModalTxt = document.querySelector(".popup__modal-txt");
const popupModalImg = document.querySelector(".popup__modal-img");



function openPopup(popup) {
  popup.classList.toggle("popup_change_display");
  document.addEventListener("keydown", closePopupEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_change_display");
  document.removeEventListener("keydown", closePopupEscape);
}

function closePopupEscape(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector(".popup_change_display"));
  }
}

function openCardPopup(name, link) {
  popupModalTxt.textContent = name;
  popupModalImg.alt = name;
  popupModalImg.src = link;
  openPopup(popupBigImage);
}

initialCards.forEach((initialCards) => {
  const card = new Card(initialCards, '.add-to-card');
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = nameInput.value;
  userProfession.textContent = jobInput.value;
  closePopup(popupEditProfile);
}


function formEditCardsSubmitHandler(evt) {
  evt.preventDefault();
  createCard();
  closePopup(popupNewCard);
  addCards.toggleButtonState();
}

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

function createCard() {
  const data = {
    name: inputName.value,
    link: inputLink.value,
  };
  const newCard = new Card(data, openCardPopup);
  const cardInputs = newCard.generateCard();
  addCard(cardInputs);
}

function addCard(cardInputs) {
  cardsContainer.prepend(cardInputs);
}

addCards.enableValidation();
editProfile.enableValidation();
addCards.toggleButtonState();
editProfile.toggleButtonState();

formEditProfile.addEventListener("submit", formEditProfileSubmitHandler);
formEditCards.addEventListener("submit", formEditCardsSubmitHandler);

openEditProfilePopupBtn.addEventListener("click", () => {
  nameInput.value = userName.textContent;
  jobInput.value = userProfession.textContent;
  editProfile.toggleButtonState();
  openPopup(popupEditProfile);
});

openAddCardPopupBtn.addEventListener("click", () => {
  openPopup(popupNewCard);
  formEditCards.reset();
  addCards.toggleButtonState();
  disabledBtn.disabled = true;
});
closeImagePopupBtn.addEventListener("click", () => {
  closePopup(popupBigImage);
});
closeAddCardPopupBtn.addEventListener("click", () => {
  closePopup(popupNewCard);
});
closeEditProfilePopupBtn.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
