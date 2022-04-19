import { initialCards } from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
const popupElement = document.querySelectorAll(".popup");
const popupProfileElement = document.querySelector(".popup_edit-profile");
const popupOpenProfileButtonElement = document.querySelector(
  ".profile__edit-button"
);
const formProfileElement = popupProfileElement.querySelector(".popup__form");
const nameInput = popupProfileElement.querySelector(".popup__input_type_name");
const jobInput = popupProfileElement.querySelector(".popup__input_type_job");
// const profileTitle = document.querySelector(".profile__title");
// const profileSubtitle = document.querySelector(".profile__subtitle");

const popupPlaceElement = document.querySelector(".popup_add-place");
const formPlaceElement = popupPlaceElement.querySelector(".popup__form");
const popupOpenPlaceButtonElement = document.querySelector(
  ".profile__add-button"
);
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
function addCard() {
  const cardElement = renderCard(
    { name: placeInput.value, link: linkInput.value },
    "#cards-template"
  );
  elementItems.prepend(cardElement);
  placeInput.value = "";
  linkInput.value = "";
  formPlaceElementValidator.disableSubmitButton();
}
function addPlaceFormSubmit(event) {
  closePopup(popupPlaceElement);
  event.preventDefault();
  addCard();
}

// // редактировать профиль
// function editProfileFormSubmit(event) {
//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = jobInput.value;
//   closePopup(popupProfileElement);
// }



const user = new UserInfo('.profile__title', '.profile__subtitle');
const popupProfile = new PopupWithForm({popupSelector: '.popup_edit-profile', handleFormSubmit: (inputValues) => {
  user.setUserInfo(inputValues);
   popupProfile.close();}});
popupProfile.setEventListeners();
// console.log(user)
// console.log(popupProfile)

const popupPlace = new PopupWithForm({popupSelector:'.popup_add-place',handleFormSubmit:(inputValues) => {
  renderCard(inputValues);
  popupPlace.close();
  console.log(popupProfile)
  // formPlaceElementValidator.toggleButton();
}});
popupPlace.setEventListeners();
// //открытие попапа редактировать профиль
const openPopupProfile = () => {
  nameInput.value = user.getUserInfo().userName;
  jobInput.value = user.getUserInfo().userJob;
  // popupProfile.setEventListeners(user.getUserInfo())
  popupProfile.open();
};


// formPlaceElement.addEventListener("submit", addPlaceFormSubmit);
//отправить редактировать профиль
// formProfileElement.addEventListener("submit", editProfileFormSubmit);

popupOpenProfileButtonElement.addEventListener("click", openPopupProfile);

popupOpenPlaceButtonElement.addEventListener("click", function () {
  popupPlace.open();
});


