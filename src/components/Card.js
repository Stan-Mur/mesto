export class Card {
  constructor(
    { name, link, likes = [], _id, owner },
    cardSelector,
    handleCardClick,
    dislikeCards,
    likeCards,
    buttonDeleteCard,
    myId
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._number = likes.length;
    this._owner = owner._id;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._dislikeCards = dislikeCards;
    this._likeCards = likeCards;
    this._buttonDeleteCard = buttonDeleteCard;
    this._myId = myId._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  _setLikeCardListener() {
    if (this._checkLikes(this._likes)) {
      this._dislikeCards(this, this._id);
    } else {
      this._likeCards(this, this._id);
    }
  }
  _checkLikes(likes) {
    return likes?.some((user) => user._id === this._myId);
  }
  _numLikesElement() {
    return this._numLikes;
  }
  showLikes(likes) {
    this._likes = likes;
    this._numberLikes = this._likes.length;
    this._numLikesElement().textContent = this._numberLikes;
    if (this._checkLikes(likes)) {
      this._likeCard.classList.add("element-like__like_active");
    } else {
      this._likeCard.classList.remove("element-like__like_active");
    }
  }

  deleteСard() {
    this._element.remove();
    this._element = null;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._numLikes = this._element.querySelector(".element-like__number");
    this._likeCard = this._element.querySelector(".element-like__like");
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__text");
    this._cardDeleteButton = this._element.querySelector(
      ".element__button-trash"
    );

    this._setEventListeners();
    this.showLikes(this._likes);

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._numLikes.textContent = this._number;

    if (this._owner === this._myId) {
      return this._element;
    } else {
      this._cardDeleteButton.style.display = "none";
      return this._element;
    }
  }
  _setEventListeners() {
    this._likeCard.addEventListener("click", () => {
      this._setLikeCardListener();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._buttonDeleteCard(this, this._id);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
