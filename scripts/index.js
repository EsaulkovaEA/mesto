import {FormValidator} from './FormValidator.js'
const popupElement = document.querySelectorAll(".popup");
const popupProfileElement = document.querySelector(".popup_edit-profile");
const popupOpenProfileButtonElement = document.querySelector(".profile__edit-button");
const formProfileElement = popupProfileElement.querySelector(".popup__form");
const nameInput = popupProfileElement.querySelector(".popup__input_type_name");
const jobInput = popupProfileElement.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const popupPlaceElement = document.querySelector(".popup_add-place");
const submitButtonElement = popupPlaceElement.querySelector(".popup__button");
const formPlaceElement = popupPlaceElement.querySelector(".popup__form");
const popupOpenPlaceButtonElement = document.querySelector(".profile__add-button");
const placeInput = popupPlaceElement.querySelector(".popup__input_type_place");
const linkInput = popupPlaceElement.querySelector(".popup__input_type_link");
const elementItems = document.querySelector(".places__list");

const popupOpenImage = document.querySelector(".popup_view-image");
const popupImageElement = popupOpenImage.querySelector(".popup__image");
const popupCaptionElement = popupOpenImage.querySelector(".popup__caption");

const validatorConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__input-error",
};

const formProfileElementValidator = new FormValidator(validatorConfig,formProfileElement)
const formPlaceElementValidator = new FormValidator(validatorConfig,formPlaceElement)

formProfileElementValidator.enableValidation();
formPlaceElementValidator.enableValidation();

//создаем карточку
function renderItem(item) {
  const cardsTemplate = document.querySelector("#cards-template").content;
  // клонируем содержимое тега template
  const cardElement = cardsTemplate.querySelector(".element__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardTitle = cardElement.querySelector(".element__title");
  cardImage.alt = item.name;
  cardImage.src = item.link;
  cardTitle.textContent = item.name;

  cardImage.addEventListener("click", openPopupImageElement);

  const cardTrash = cardElement.querySelector(".element__trash");
  cardTrash.addEventListener("click", deleteCard);

  const cardLike = cardElement.querySelector(".element__like");
  cardLike.addEventListener("click", addLikeCard);

  return cardElement;
}
function renderItems(items) {
  items.forEach(function (item) {
    elementItems.append(renderItem(item));
  });
}
renderItems(initialCards);

// лайк карточки
function addLikeCard(event) {
  event.target.classList.toggle("element__like_active");
}
// удаление карточки
function deleteCard(event) {
  const cardElement = event.target.closest(".element__item");
  cardElement.remove();
}

// добавление карточки
function addCard() {
  const cardElement = {
    name: placeInput.value,
    link: linkInput.value
  }
  elementItems.prepend(renderItem(cardElement));
  placeInput.value = "";
  linkInput.value = "";
  formPlaceElementValidator.disableSubmitButton();
}
function addPlaceFormSubmit(event) {
  event.preventDefault();
  addCard();
  closePopup(popupPlaceElement);
}

//открытие карточки с изображением
function openPopupImageElement(event) {
  openPopup(popupOpenImage);
  popupImageElement.src = event.target.src;
  popupImageElement.alt = event.target.alt;
  popupCaptionElement.textContent = event.target.alt;
}

// редактировать профиль
function editProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfileElement);
}

//закрытие нажатием ESC
const clickEscClose = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

// открытие попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', clickEscClose);
};

// закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', clickEscClose);
};

//закрытие кликом на оверлей и крестик
popupElement.forEach((popup) => {
  popup.addEventListener("click", function (event) {
    if (event.target.classList.contains("popup_opened") || event.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//открытие попапа редактировать профиль
const openPopupProfile = () => {
  openPopup(popupProfileElement);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

formPlaceElement.addEventListener("submit", addPlaceFormSubmit);

formProfileElement.addEventListener("submit", editProfileFormSubmit);

popupOpenProfileButtonElement.addEventListener("click", openPopupProfile);

popupOpenPlaceButtonElement.addEventListener("click", function () {
  openPopup(popupPlaceElement);
});
