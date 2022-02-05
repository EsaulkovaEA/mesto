const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");

// const togglePopupVisibility = function(){
//     popupElement.classList.toggle('popup_opened');
// };
const openPopup = function () {
  popupElement.classList.add("popup_opened");
};
const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};
const closePopupByClickOnOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};
popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
popupElement.addEventListener("click", closePopupByClickOnOverlay);

let formElement = document.querySelector(".popup__content");
let nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector(".popup__input_type_job"); // Воспользуйтесь инструментом .querySelector()

function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__subtitle").textContent = jobInput.value;
  closePopup();
}

document.querySelector(".profile__title").textContent = nameInput.value;
document.querySelector(".profile__subtitle").textContent = jobInput.value;

formElement.addEventListener("submit", formSubmitHandler);
