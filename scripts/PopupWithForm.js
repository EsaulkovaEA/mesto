import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._popupFormButton = this._popup.querySelector(".popup__button");
    this._popupFormButtonValue = this._popupFormButton.textContent;
    // this._inputsList = Array.from(this._form.querySelectorAll(".popup__input"));
  }
  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._inputValues = {};
    this._inputList.forEach(
      (input) => (this._inputValues[input.name] = input.value)
    );

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this._form.reset();
    });
  }
  close() {
    this._form.reset();
    super.close();
  }
}
