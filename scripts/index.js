const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
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


const elementItems = document.querySelector(".element__items");
const cardsTemplate = document.querySelector("#cards-template").content;
// клонируем содержимое тега template
const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);




// в функцию const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
const popupImageElement = document.querySelector(".popup_view-image");
const popupCloseImageElement = popupImageElement.querySelector(".popup__close");

const popupOpenImageButtonElement = document.querySelector(".element");



function openPopup (popup) {
  popup.classList.add("popup_opened");

};
function closePopup (popup) {
  popup.classList.remove("popup_opened");
};
// const closePopupByClickOnOverlay = function (event) {
//   if (event.target !== event.currentTarget) {
//     return;
//   }
//   closePopup();
// };



formElement.addEventListener("submit", function formSubmitEditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfileElement);
});

formPlaceElement.addEventListener("submit", function formSubmitAddPlace(evt) {
  evt.preventDefault();

  closePopup(popupPlaceElement);
});




popupOpenProfileButtonElement.addEventListener("click", function()
{
  openPopup(popupProfileElement);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});
popupOpenPlaceButtonElement.addEventListener("click", function()
{
  openPopup(popupPlaceElement);
  // console.log(event);
});
popupOpenImageButtonElement.addEventListener("click", function()
{
  openPopup(popupImageElement);
  // console.log(event);
});



popupCloseProfileElement.addEventListener("click", function(){
  closePopup(popupProfileElement);
});
popupClosePlaceElement.addEventListener("click", function(){
  closePopup(popupPlaceElement);
});
popupCloseImageElement.addEventListener("click", function(){
  closePopup(popupImageElement);
});

// popupElement.addEventListener("click", closePopupByClic kOnOverlay);
