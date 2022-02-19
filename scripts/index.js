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

const popupProfileElement = document.querySelector('.popup_edit-profile');
const popupCloseProfileElement = popupProfileElement.querySelector('.popup__close');
const popupOpenProfileButtonElement = document.querySelector('.profile__edit-button');
const formElement = popupProfileElement.querySelector('.popup__content');
const nameInput = popupProfileElement.querySelector('.popup__input_type_name');
const jobInput = popupProfileElement.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupPlaceElement = document.querySelector('.popup_add-place');
const popupClosePlaceElement = popupPlaceElement.querySelector('.popup__close');
const formPlaceElement = popupPlaceElement.querySelector('.popup__content');
const popupOpenPlaceButtonElement = document.querySelector('.profile__add-button');
const placeInput = popupProfileElement.querySelector('.popup__input_type_place');
const linkInput = popupProfileElement.querySelector('.popup__input_type_link');

const elementItems = document.querySelector('.element__list');

//создаем карточку
function renderItem (item) {
  const cardsTemplate = document.querySelector('#cards-template').content;
  // клонируем содержимое тега template
  const cardElement = cardsTemplate.querySelector('.element__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  cardImage.alt = item.name;
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  elementItems.append(cardElement);
}
function renderItems (items) {
  items.forEach(renderItem);
}



const popupImageElement = document.querySelector('.popup_view-image');
const popupCloseImageElement = popupImageElement.querySelector('.popup__close');

// const popupOpenImageButtonElement = document.querySelector(".element");



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
// popupOpenImageButtonElement.addEventListener("click", function()
// {
//   openPopup(popupImageElement);
//   // console.log(event);
// });


renderItems(initialCards);

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
