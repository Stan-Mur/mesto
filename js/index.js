const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = document.querySelector(".popup__form_profile_change");
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.about;
const formEditCards = document.querySelector(".popup__form_profile_cards");
const popupOpenAddCardBtn = document.querySelector(".profile__open-add-card");
const userName = document.querySelector(".profile__title");
const userProfession = document.querySelector(".profile__subtitle");
const popupContainer = document.querySelector(".popup__modal-img");
const popupOpenEditProfileBtn = document.querySelector(".profile__edit-btn");
const popupCloseEditProfileBtn = document.querySelector(
  ".popup__close-btn_profile"
);
const popupImgTxt = document.querySelector(".popup__modal-txt");
const popupBigImage = document.querySelector(".popup_type_images");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCloseImageBtn = document.querySelector(".popup__close-btn_img");
const popupCloseAddCardBtn = document.querySelector(".popup__close-btn_cards");
const cardTemplate = document.querySelector(".add-to-card");
const cardsContainer = document.querySelector(".elements__items");
const popups = document.querySelectorAll(".popup");
const disabledCardsBtn = document.querySelector(".popup__form-btn-cards");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-name",
  submitButtonSelector: ".popup__form-btn",
  inputErrorClass: "popup__form-name_error",
  errorActiveClass: "popup__form-input-error_active",
};

initialCards.forEach((element) => {
  const initialCardElement = createCard(element.name, element.link);
  addCard(initialCardElement);
});

function createCard(titleImg, imageInput) {
  const initialCardElement = cardTemplate.content
    .querySelector(".elements__item")
    .cloneNode(true);
  const imageText = initialCardElement.querySelector(".elements__subtitle");
  const imageClick = initialCardElement.querySelector(".elements__items-img");

  imageText.textContent = titleImg;
  imageClick.alt = titleImg;
  imageClick.src = imageInput;

  imageClick.addEventListener("click", () => {
    openPopupImages(imageClick.src, imageText.textContent);
  });

  initialCardElement
    .querySelector(".elements__like-btn")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like-btn_active");
    });

  initialCardElement
    .querySelector(".elements__items-basket-btn")
    .addEventListener("click", function (evt) {
      const listItem = initialCardElement.closest(".elements__item");
      listItem.remove();
    });

  return initialCardElement;
}

function addCard(initialCardElement) {
  cardsContainer.prepend(initialCardElement);
}

function openPopup(popup) {
  popup.classList.add('popup_change_display');
  document.addEventListener('keydown', closePopupEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_change_display');
  document.removeEventListener('keydown', closePopupEscape);
};

function closePopupEscape(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_change_display'));
  }
}

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

function openPopupImages(imageInput, titleImg) {
  popupContainer.src = imageInput;
  popupImgTxt.textContent = titleImg;
  popupContainer.alt = titleImg;
  openPopup(popupBigImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userProfession.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardInputs = createCard(titleInput.value, imageInput.value);
  addCard(cardInputs);
  closePopup(popupNewCard);
  evt.target.reset();
}

popupOpenEditProfileBtn.addEventListener("click", () => {
  nameInput.value = userName.textContent;
  jobInput.value = userProfession.textContent;
  openPopup(popupEditProfile);
});

popupOpenAddCardBtn.addEventListener("click", () => {
  openPopup(popupNewCard);
  formEditCards.reset();
  disabledCardsBtn.disabled = true;
});

popupCloseImageBtn.addEventListener("click", () => {
  closePopup(popupBigImage);
});
popupCloseAddCardBtn.addEventListener("click", () => {
  closePopup(popupNewCard);
});
popupCloseEditProfileBtn.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formEditCards.addEventListener("submit", handleCardFormSubmit);

enableValidation(config);
