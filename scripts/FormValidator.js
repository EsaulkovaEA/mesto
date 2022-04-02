export class FormValidator {
  constructor(setting, form) {
    this._form = form;
    this._setting = setting;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._setting.inputSelector)
    );
    this._submitButtonElement = this._form.querySelector(
      this._setting.submitButtonSelector
    );
  }

  _showError(inputElement, errorMessage) {
    const { inputErrorClass, errorClass } = this._setting;
    const errorElement = inputElement
      .closest(".popup__form-field")
      .querySelector(errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputErrorClass);
  }

  _hideError(inputElement) {
    const { inputErrorClass, errorClass } = this._setting;
    const errorElement = inputElement
      .closest(".popup__form-field")
      .querySelector(errorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showError(inputElement, errorMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  disableSubmitButton() {
    this._submitButtonElement.classList.add(this._setting.inactiveButtonClass);
    this._submitButtonElement.setAttribute("disabled", true);
  }

  _enableSubmitButton() {
    this._submitButtonElement.classList.remove(
      this._setting.inactiveButtonClass
    );
    this._submitButtonElement.removeAttribute("disabled");
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });

    if (hasInvalidInput) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }
}
