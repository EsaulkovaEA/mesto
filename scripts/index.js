const popupElement = document.querySelectorAll(".popup");
const popupProfileElement = document.querySelector(".popup_edit-profile");
const popupCloseProfileElement = popupProfileElement.querySelector(".popup__close");
const popupOpenProfileButtonElement = document.querySelector(".profile__edit-button");
const formProfileElement = popupProfileElement.querySelector(".popup__form");
const nameInput = popupProfileElement.querySelector(".popup__input_type_name");
const jobInput = popupProfileElement.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const popupPlaceElement = document.querySelector(".popup_add-place");
const popupClosePlaceElement = popupPlaceElement.querySelector(".popup__close");
const formPlaceElement = popupPlaceElement.querySelector(".popup__form");
const popupOpenPlaceButtonElement = document.querySelector(".profile__add-button");
const placeInput = popupPlaceElement.querySelector(".popup__input_type_place");
const linkInput = popupPlaceElement.querySelector(".popup__input_type_link");
const elementItems = document.querySelector(".places__list");

const popupOpenImage = document.querySelector(".popup_view-image");
const popupCloseImageElement = popupOpenImage.querySelector(".popup__close");
const popupImageElement = popupOpenImage.querySelector(".popup__image");
const popupCaptionElement = popupOpenImage.querySelector(".popup__caption");

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

  return cardElement;
}
function renderItems(items) {
  items.forEach(function (item) {
    elementItems.append(renderItem(item));
  });
}
renderItems(initialCards);

// лайк карточки
const cardLikes = document.querySelectorAll(".element__like");
cardLikes.forEach((cardLike) => {
  cardLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
  });
});

// удаление карточки
const cardTrashs = document.querySelectorAll(".element__trash");
cardTrashs.forEach((cardTrash) => {
  cardTrash.addEventListener("click", deleteCard);
});
function deleteCard(event) {
  const cardElement = event.target.closest(".element__item");
  cardElement.remove();
}

// добавление карточки
function addCard() {
  const cardElement = document.querySelector(".element__item");
  cardElement.name = placeInput.value;
  cardElement.link = linkInput.value;
  elementItems.prepend(renderItem(cardElement));
  placeInput.value = "";
  linkInput.value = "";
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
// открытие попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
// закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//закрытие кликом на оверлей
popupElement.forEach((popup) => {
  popup.addEventListener("click", function (event) {
    if (event.target !== event.currentTarget) {
      return;
    }
    closePopup(popup);
  });
});

//закрытие нажатием ESC
popupElement.forEach((popup) => {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closePopup(popup);
    }
  });
});

formPlaceElement.addEventListener("submit", addPlaceFormSubmit);

formProfileElement.addEventListener("submit", editProfileFormSubmit);

popupOpenProfileButtonElement.addEventListener("click", function () {
  openPopup(popupProfileElement);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});
popupOpenPlaceButtonElement.addEventListener("click", function () {
  openPopup(popupPlaceElement);
});

popupCloseProfileElement.addEventListener("click", function () {
  closePopup(popupProfileElement);
});
popupClosePlaceElement.addEventListener("click", function () {
  closePopup(popupPlaceElement);
});
popupCloseImageElement.addEventListener("click", function () {
  closePopup(popupOpenImage);
});
