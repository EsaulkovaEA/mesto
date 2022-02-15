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
const formElement = document.querySelector(".popup__content");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const popupPlaceElement = document.querySelector(".popup_add-place");
const popupClosePlaceElement = popupPlaceElement.querySelector(".popup__close");
const popupOpenPlaceButtonElement = document.querySelector(".profile__add-button");



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

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfileElement);
}

formElement.addEventListener("submit", formSubmitHandler);
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
popupCloseProfileElement.addEventListener("click", function(){
  closePopup(popupProfileElement);
});
popupClosePlaceElement.addEventListener("click", function(){
  closePopup(popupPlaceElement);
});

// popupElement.addEventListener("click", closePopupByClic kOnOverlay);
