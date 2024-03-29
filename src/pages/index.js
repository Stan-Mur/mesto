import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import {
    formEditProfile,
    formAddCard,
    formRedactAvatar,
    openRedactAvatarPopupBtn,
    openEditProfilePopupBtn,
    openAddCardPopupBtn,
    popupProfileRedact,
    popupAvatarRedact,
    popupAddNewCard,
    nameInput,
    jobInput,
    selectorsAll
} from '../utils/constants.js';


const cardEditProfile = new FormValidator(selectorsAll, formEditProfile);
const cardAdd = new FormValidator(selectorsAll, formAddCard);
const cardRedactAvatar = new FormValidator(selectorsAll, formRedactAvatar);
cardEditProfile.enableValidation();
cardRedactAvatar.enableValidation();
cardAdd.enableValidation();
cardAdd.toggleButtonState();

const popupEditProfile = new PopupWithForm('.popup_type_redact', formEditProfileSubmitHandler);
const popupAddCard = new PopupWithForm('.popup_type_add-card', submitAddCardForm);
const popupRedactAvatar = new PopupWithForm('.popup_type_redact-avatar', submitRedactAvatarForm);
const popupDeletion = new PopupWithConfirmation('.popup_type_deletion', submitDeleteCard);
const popupImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo(selectorsAll);

const addSection = new Section({
        renderer: (item, myId) => {
            addSection.addItem(renderCard(item, myId));
        }
    },
    selectorsAll.elements
);

function formEditProfileSubmitHandler(evt, data) {
    evt.preventDefault();
    renderLoading(true, popupProfileRedact);
    loadingUserInfo(data);
};

function buttonDeleteCard(card, cardId) {
    popupDeletion.openPopup(card, cardId);
    popupDeletion.deleteEventListener();
};

function renderCard(item, myId) {
    const card = new Card(
        item,
        '#card-template',
        handleCardClick,
        dislikeCard,
        likeCard,
        buttonDeleteCard,
        myId);
    const cardElement = card.generateCard();
    return cardElement;
}


function submitDeleteCard(evt, card, cardId) {
    evt.preventDefault();
    deleteServerCard(card, cardId);
}

function submitRedactAvatarForm(evt, data) {
    evt.preventDefault();
    renderLoading(true, popupAvatarRedact);
    loadingAvatar(data);
    cardRedactAvatar.toggleButtonState();
}

function submitAddCardForm(evt, data) {
    evt.preventDefault();
    renderLoading(true, popupAddNewCard);
    loadingNewCard(data);
    cardEditProfile.toggleButtonState();
    cardAdd.toggleButtonState();
}

openEditProfilePopupBtn.addEventListener('click', function() {
    const data = userInfo.getUserInfo();

    nameInput.value = data.name;
    jobInput.value = data.about;
    cardEditProfile.toggleButtonState();
    popupEditProfile.openPopup();
});

openAddCardPopupBtn.addEventListener('click', function() {
    cardAdd.toggleButtonState();
    popupAddCard.openPopup();
});

openRedactAvatarPopupBtn.addEventListener('click', function() {
    cardRedactAvatar.toggleButtonState();
    popupRedactAvatar.openPopup();
});

popupRedactAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupDeletion.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();


function handleCardClick(name, link) {
    popupImage.openPopup(name, link);
}


function renderError(err) {
    result.textContent = '';
    error.textContent = err;
}

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-64',
    headers: {
        authorization: '9739a35e-2b3d-46e8-aa26-f34f71d5093f',
        'Content-Type': 'application/json'
    }
});

initialAll();


 
function initialAll() {
    Promise.all([api.initialUsers(), api.initCardsFromServer()])
        .then((result) => {
            userInfo.setUserInfo(result[0]);
            userInfo.setAvatarLink(result[0]);
            addSection.renderItems(result[1].reverse(), result[0]);
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
}

function deleteServerCard(card, cardId) {
    api.deleteCardFromServer(cardId)
        .then(() => {
            card.deleteСard();
            popupDeletion.closePopup(card, cardId)
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        });
}

function likeCard(card, likeId) {
    api.likeCards(likeId)
        .then((result) => {
            card.showLikes(result.likes);
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
}

function dislikeCard(card, likeId) {
    api.dislikeCards(likeId)
        .then((result) => {
            card.showLikes(result.likes);
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
}

function loadingAvatar(data) {
    api.loadingNewAvatarOnServer({ avatar: data.avatar })
        .then((result) => {
            userInfo.setAvatarLink(result);
            popupRedactAvatar.closePopup();
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupAvatarRedact);
        });
}

function loadingNewCard(data) {
    api.loadingNewCardOnServer({ name: data.title, link: data.link })
        .then((result) => {
            addSection.addItem(renderCard(result, result.owner));
            popupAddCard.closePopup();
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupAddNewCard);
        });
}

function loadingUserInfo(data) {
    api.loadingUserInfoOnServer({ name: data.name, about: data.about })
        .then((result) => {
            userInfo.setUserInfo(result);
            popupEditProfile.closePopup();
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, popupProfileRedact);
        });
}

function renderLoading(isLoading, popup) {
    if (isLoading) {
        popup.querySelector(selectorsAll.formloading).classList.add('form__loading_visible');
        popup.querySelector(selectorsAll.submitButtonSelector).classList.add('form__save-button_hidden');
    } else {
        popup.querySelector(selectorsAll.formloading).classList.remove('form__loading_visible');
        popup.querySelector(selectorsAll.submitButtonSelector).classList.remove('form__save-button_hidden');
    }
}
