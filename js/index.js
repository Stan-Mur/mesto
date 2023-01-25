// модалка
let popup = document.querySelector('.popup');

//тайтлы
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

// Находим форму в DOM (и инпуты)
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.elements.name;
let jobInput = formElement.elements.about;

//открытие модалки
let btnPopupOpened = document.querySelector('.profile__edit-btn');
function popupOpened() {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

//закрытие модалки
let btnPopupClose = document.querySelector('.popup__close-btn');
function popupClose() {
  popup.classList.remove('popup_opened');
}

// батон нарезной сохранить
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

btnPopupOpened.addEventListener('click', popupOpened); //открыли
btnPopupClose.addEventListener('click', popupClose); //закрыли
