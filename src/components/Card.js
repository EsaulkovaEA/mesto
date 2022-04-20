export default class Card {
  constructor(data, cardTemplateSelector,handleCardClick) {
    this._cardsTemplate = document.querySelector(cardTemplateSelector).content;
    this._data = data;
    this._handleCardClick = handleCardClick;
  }

  // лайк карточки
  _addLikeCard = () => {
    this._cardLike.classList.toggle("element__like_active");
  };
  // удаление карточки
  _deleteCard = () => {
    this._cardElement.remove();
    this._element = null;
  };
  _setEventListener() {
    const cardTrash = this._cardElement.querySelector(".element__trash");
    this._cardImage.addEventListener('click', () => {
			this._handleCardClick(this._data.name, this._data.link)
		});
    cardTrash.addEventListener("click", this._deleteCard);
    this._cardLike.addEventListener("click", this._addLikeCard);
  }
  //создаем карточку
  renderItem() {
    // клонируем содержимое тега template
    this._cardElement = this._cardsTemplate
      .querySelector(".element__item")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".element__image");
    this._cardTitle = this._cardElement.querySelector(".element__title");

    this._cardImage.alt = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardTitle.textContent = this._data.name;

    this._cardLike = this._cardElement.querySelector(".element__like");
    this._setEventListener();
    return this._cardElement;
  }
}
