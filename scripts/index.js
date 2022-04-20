import { initialCards } from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
const popupProfileElement = document.querySelector(".popup_edit-profile");
const popupOpenProfileButtonElement = document.querySelector(
  ".profile__edit-button"
);
const formProfileElement = popupProfileElement.querySelector(".popup__form");
const nameInput = popupProfileElement.querySelector(".popup__input_type_name");
const jobInput = popupProfileElement.querySelector(".popup__input_type_job");

const popupPlaceElement = document.querySelector(".popup_add-place");
const formPlaceElement = popupPlaceElement.querySelector(".popup__form");
const popupOpenPlaceButtonElement = document.querySelector(
  ".profile__add-button"
);
const elementItems = document.querySelector(".places__list");

const validatorConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__input-error",
};

const formProfileElementValidator = new FormValidator(
  validatorConfig,
  formProfileElement
);
const formPlaceElementValidator = new FormValidator(
  validatorConfig,
  formPlaceElement
);

formProfileElementValidator.enableValidation();
formPlaceElementValidator.enableValidation();

const popupImage = new PopupWithImage(".popup_view-image");
popupImage.setEventListeners();

const renderCard = (item) =>
  new Card(item, "#cards-template", () => {
    popupImage.open(item.name, item.link);
  }).renderItem();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      elementItems.append(renderCard(item));
    },
  },
  elementItems
);
cardList.renderItems();

// добавление карточки
function addCard(item) {
  const cardElement = renderCard(
    { name: item.placeInput, link: item.linkInput },
    "#cards-template"
  );
  elementItems.prepend(cardElement);
  formPlaceElementValidator.disableSubmitButton();
}

const user = new UserInfo({
  nameInput: ".profile__title",
  jobInput: ".profile__subtitle",
});

const popupProfile = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  handleFormSubmit: user.setUserInfo,
});
popupProfile.setEventListeners();

const popupPlace = new PopupWithForm({
  popupSelector: ".popup_add-place",
  handleFormSubmit: addCard,
});
popupPlace.setEventListeners();

//открытие попапа редактировать профиль
const openPopupProfile = () => {
  popupProfile.open();
  nameInput.value = user.getUserInfo().userName;
  jobInput.value = user.getUserInfo().userJob;
  formProfileElementValidator.disableSubmitButton();
};

popupOpenProfileButtonElement.addEventListener("click", openPopupProfile);

popupOpenPlaceButtonElement.addEventListener("click", function () {
  popupPlace.open();
});
