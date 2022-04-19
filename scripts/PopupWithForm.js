import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }
  // собирает данные всех полей формы
  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);
    console.log(this._inputValues)
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._getInputValues();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      // this.close();
      // this._form.reset();
    });
  }
  close() {
    this._form.reset();
    super.close();
  }
}
//   // редактировать профиль
// function editProfileFormSubmit(event) {
//     profileTitle.textContent = nameInput.value;
//     profileSubtitle.textContent = jobInput.value;
//     closePopup(popupProfileElement);
//   }

//   //открытие попапа редактировать профиль
//   const openPopupProfile = () => {
//     nameInput.value = profileTitle.textContent;
//     jobInput.value = profileSubtitle.textContent;
//     openPopup(popupProfileElement);
