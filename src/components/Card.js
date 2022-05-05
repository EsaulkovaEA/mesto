export default class Card {
  constructor(
    data,
    { userId },
    cardTemplateSelector,
    handleCardClick,
    handelLikeClick,
    handleDeleteClick
  ) {
    this._data = data;
    this._cardsTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._owner = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handelLikeClick = handelLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }
  // проверка id
  getLikes() {
    // console.log(this._userId)
    return this._likes.some((item) => this._userId === item._id);
  }
  // кол-во лайков
  setLikesCard(data) {
    this._likes = data;
    this._countLike = this._cardElement.querySelector(".element__counter");
    this._likeElement = this._cardElement.querySelector(".element__like");
    this._countLike.textContent = this._likes.length;
    if (this.getLikes()) {
      this._likeElement.classList.add("element__like_active");
    } else {
      this._likeElement.classList.remove("element__like_active");
    }
  }
  // удаление карточки
  deleteCard = () => {
    this._cardElement.remove();
    this._element = null;
  };
  _setEventListener() {
    this._cardTrash = this._cardElement.querySelector(".element__trash");
    this._cardTrash.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this.name, this.link);
    });
    this._likeElement.addEventListener("click", () => {
      this._handelLikeClick(this._id);
    });
  }

  //создаем карточку
  renderItem() {
    // клонируем содержимое тега template
    this._cardElement = this._cardsTemplate
      .querySelector(".element__item")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".element__image");
    this._cardTitle = this._cardElement.querySelector(".element__title");

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;

    this.setLikesCard(this._likes);

    this._setEventListener();

    if (this._userId !== this._owner) {
      this._cardTrash.remove();
    }
    return this._cardElement;
  }
}
