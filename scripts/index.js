const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupProfileElement = document.querySelector(".popup_edit-profile");
const popupCloseProfileElement = popupProfileElement.querySelector(".popup__close");
const popupOpenProfileButtonElement = document.querySelector(".profile__edit-button");
const formElement = popupProfileElement.querySelector(".popup__content");
const nameInput = popupProfileElement.querySelector(".popup__input_type_name");
const jobInput = popupProfileElement.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const popupPlaceElement = document.querySelector(".popup_add-place");
const popupClosePlaceElement = popupPlaceElement.querySelector(".popup__close");
const formPlaceElement = popupPlaceElement.querySelector(".popup__content");
const popupOpenPlaceButtonElement = document.querySelector(".profile__add-button");
const placeInput = popupPlaceElement.querySelector(".popup__input_type_place");
const linkInput = popupPlaceElement.querySelector(".popup__input_type_link");
const elementItems = document.querySelector(".element__list");

const popupOpenImage = document.querySelector(".popup_view-image");
const popupCloseImageElement = popupOpenImage.querySelector(".popup__close");
const popupImageElement = popupOpenImage.querySelector(".popup__image");
const popupCaptionElement = popupOpenImage.querySelector(".popup__caption");

//создаем карточку
function renderItem(item) {
  const cardsTemplate = document.querySelector("#cards-template").content;
  // клонируем содержимое тега template
  const cardElement = cardsTemplate
    .querySelector(".element__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardTitle = cardElement.querySelector(".element__title");
  cardImage.alt = item.name;
  cardImage.src = item.link;
  cardTitle.textContent = item.name;

  cardImage.addEventListener("click", popupOpenImageElement);

  const cardTrash = cardElement.querySelector(".element__trash");
  cardTrash.addEventListener("click", cardDelete);

  cardLike = cardElement.querySelector(".element__like");
  cardLike.addEventListener("click", cardAddLike);

  return cardElement;
}
function renderItems(items) {
  items.forEach(function (item) {
    elementItems.append(renderItem(item));
  });
}
renderItems(initialCards);

// лайк карточки
function cardAddLike(event) {
  event.target.classList.toggle("element__like_active");
}
// удаление карточки
function cardDelete(event) {
  const cardElement = event.target.closest(".element__item");
  cardElement.remove();
}

// добавление карточки
function cardAdd() {
  const cardElement = document.querySelector(".element__item");
  cardElement.name = placeInput.value;
  cardElement.link = linkInput.value;
  elementItems.prepend(renderItem(cardElement));
}
function formSubmitAddPlace(event) {
  event.preventDefault();
  cardAdd();
  closePopup(popupPlaceElement);
}

//открытие карточки с изображением
function popupOpenImageElement(event) {
  openPopup(popupOpenImage);
  popupImageElement.src = event.target.src;
  popupImageElement.alt = event.target.alt;
  popupCaptionElement.textContent = event.target.alt;
}

// редактировать профиль
function formSubmitEditProfile(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfileElement);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
// const closePopupByClickOnOverlay = function (event) {
//   if (event.target !== event.currentTarget) {
//     return;
//   }
//   closePopup();
// };

formPlaceElement.addEventListener("submit", formSubmitAddPlace);

formElement.addEventListener("submit", formSubmitEditProfile);

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

// popupElement.addEventListener("click", closePopupByClic kOnOverlay);
