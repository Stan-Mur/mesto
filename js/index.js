const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = document.querySelector(".popup__form_profile_change");
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.about;
const formEditCards = document.querySelector(".popup__form_profile_cards");
const openAddCardPopupBtn = document.querySelector(".profile__open-add-card");
const userName = document.querySelector(".profile__title");
const userProfession = document.querySelector(".profile__subtitle");
const popupContainer = document.querySelector(".popup__modal-img");
const openEditProfilePopupBtn = document.querySelector(".profile__edit-btn");
const closeEditProfilePopupBtn = document.querySelector(
  ".popup__close-btn_profile"
);
const popupImgTxt = document.querySelector(".popup__modal-txt");
const popupBigImage = document.querySelector(".popup_type_images");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeImagePopupBtn = document.querySelector(".popup__close-btn_img");
const closeAddCardPopupBtn = document.querySelector(".popup__close-btn_cards");
const cardTemplate = document.querySelector(".add-to-card");
const cardsContainer = document.querySelector(".elements__items");

const initialCards = [
  {
    name: "Рыжий",
    link: "https://i.pinimg.com/564x/93/7d/2f/937d2fc0bce603a3c38af2b62f67c05c.jpg",
  },
  {
    name: "Пыр",
    link: "https://i.pinimg.com/564x/46/5a/34/465a34ad6dabd1e70d1088163ebca4f3.jpg",
  },
  {
    name: "Тиг",
    link: "https://i.pinimg.com/564x/ee/46/f4/ee46f45e43bcca5f924891d0b824be3e.jpg",
  },
  {
    name: "Бобби",
    link: "https://i.pinimg.com/564x/c8/33/ef/c833ef95cf585d33d39a998ffb1efcce.jpg",
  },
  {
    name: "Клэй",
    link: "https://i.pinimg.com/564x/cd/fd/25/cdfd252cd53251c2e93e910c091618be.jpg",
  },
  {
    name: "Джекс",
    link: "https://i.pinimg.com/564x/09/35/68/09356844633eb2a540f014f776047c0b.jpg",
  },
];

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
  popup.classList.add("popup_change_display");
}

function closePopup(popup) {
  popup.classList.remove("popup_change_display");
}

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

openEditProfilePopupBtn.addEventListener("click", () => {
  nameInput.value = userName.textContent;
  jobInput.value = userProfession.textContent;
  openPopup(popupEditProfile);
});

openAddCardPopupBtn.addEventListener("click", () => {
  openPopup(popupNewCard);
});
//как пустить через цикл 100 модалок понимаю и могу сделать, но не стал ничего менять потому, что вроде как работа с классами будет дальше, ООП, и всё перепишем
closeImagePopupBtn.addEventListener("click", () => { 
  closePopup(popupBigImage);
});
closeAddCardPopupBtn.addEventListener("click", () => {
  closePopup(popupNewCard);
});
closeEditProfilePopupBtn.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formEditCards.addEventListener("submit", handleCardFormSubmit);
