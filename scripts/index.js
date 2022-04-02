import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { openPopup, closePopup } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
const popupElement = document.querySelectorAll(".popup");
const popupProfileElement = document.querySelector(".popup_edit-profile");
const popupOpenProfileButtonElement = document.querySelector(".profile__edit-button");
const formProfileElement = popupProfileElement.querySelector(".popup__form");
const nameInput = popupProfileElement.querySelector(".popup__input_type_name");
const jobInput = popupProfileElement.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const popupPlaceElement = document.querySelector(".popup_add-place");
const formPlaceElement = popupPlaceElement.querySelector(".popup__form");
const popupOpenPlaceButtonElement = document.querySelector(".profile__add-button");
const placeInput = popupPlaceElement.querySelector(".popup__input_type_place");
const linkInput = popupPlaceElement.querySelector(".popup__input_type_link");
const elementItems = document.querySelector(".places__list");

const validatorConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__input-error",
};

const formProfileElementValidator = new FormValidator(validatorConfig,formProfileElement);
const formPlaceElementValidator = new FormValidator(validatorConfig,formPlaceElement);

formProfileElementValidator.enableValidation();
formPlaceElementValidator.enableValidation();

const renderCard = (item) => new Card(item, "#cards-template").renderItem();

function renderItems(items) {
  items.forEach(function (item) {
    elementItems.append(renderCard(item));
  });
}
renderItems(initialCards);

// добавление карточки
function addCard() {
  const cardElement = renderCard(
    { name: placeInput.value,
      link: linkInput.value,
    },"#cards-template");
  elementItems.prepend(cardElement);
  placeInput.value = "";
  linkInput.value = "";
  formPlaceElementValidator.disableSubmitButton();
}
function addPlaceFormSubmit(event) {
  event.preventDefault();
  addCard();
  closePopup(popupPlaceElement);
}

// редактировать профиль
function editProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfileElement);
}

//закрытие кликом на оверлей и крестик
popupElement.forEach((popup) => {
  popup.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("popup_opened") ||
      event.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

//открытие попапа редактировать профиль
const openPopupProfile = () => {
  openPopup(popupProfileElement);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

formPlaceElement.addEventListener("submit", addPlaceFormSubmit);

formProfileElement.addEventListener("submit", editProfileFormSubmit);

popupOpenProfileButtonElement.addEventListener("click", openPopupProfile);

popupOpenPlaceButtonElement.addEventListener("click", function () {
  openPopup(popupPlaceElement);
});
