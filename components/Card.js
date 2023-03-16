export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);

        return cardElement;
    }

    _likeCard(evt) {
        evt.target.classList.toggle('elements__like-btn_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.elements__subtitle').textContent = this._name;
        this._element.querySelector('.elements__items-img').alt = this._name;
        this._element.querySelector('.elements__items-img').src = this._link;
        return this._element;
    }

    _setEventListeners() {
       this._element.querySelector('.elements__items-img').addEventListener('click', () => {
            this._handleCardClick();
        });

        this._element.querySelector('.elements__like-btn').addEventListener('click', (evt) => {
            this._likeCard(evt);
        });

        this._element.querySelector('.elements__items-basket-btn').addEventListener('click', () => {
            this._deleteCard();
        });

    }

}

