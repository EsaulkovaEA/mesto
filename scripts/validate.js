const obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__input-error",
};

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = inputElement.closest(".popup__form-field").querySelector(obj.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.inputErrorClass);
};

const hideError = (formElement, inputElement) => {
  const errorElement = inputElement.closest(".popup__form-field").querySelector(obj.errorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(obj.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, submitButtonElement) => {
  const hasInvalidInput = Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    submitButtonElement.classList.add(obj.inactiveButtonClass);
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove(obj.inactiveButtonClass);
    submitButtonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement) => {
  const inputs = formElement.querySelectorAll(obj.inputSelector);
  const submit = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputs, submit);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputs, submit);
    });
  });
};

const enableValidation = ({ formSelector }) => {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(obj);
