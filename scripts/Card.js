import {openPopup,popupOpenImage,popupImageElement,popupCaptionElement} from './utils.js';
export class Card {
  constructor(data, cardTemplateSelector) {
    this._cardsTemplate = document.querySelector(cardTemplateSelector).content;
    this._data = data;
  }
  //открытие карточки с изображением
  _openPopupImageElement= () =>{
    popupImageElement.src = this._data.link;
    popupImageElement.alt = this._data.name;
    popupCaptionElement.textContent = this._data.name;
    openPopup(popupOpenImage);  
}
  // лайк карточки
  _addLikeCard = () => {
    this._cardLike.classList.toggle("element__like_active");
  };
  // удаление карточки
  _deleteCard = () => {
    this._cardElement.remove();
  };
  _setEventListener() {
    const cardTrash = this._cardElement.querySelector(".element__trash");
    this._cardImage.addEventListener("click", this._openPopupImageElement);
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