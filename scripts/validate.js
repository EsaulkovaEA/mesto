const showError = (formElement, inputElement, errorMessage,validationObj) => {
  const errorElement = inputElement.closest(".popup__form-field").querySelector(validationObj.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObj.inputErrorClass);
};

const hideError = (formElement, inputElement,validationObj) => {
  const errorElement = inputElement.closest(".popup__form-field").querySelector(validationObj.errorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationObj.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement,validationObj) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage,validationObj);
  } else {
    hideError(formElement, inputElement,validationObj);
  }
};

const disableSubmitButton = (submitButtonElement,validationObj) => {
    submitButtonElement.classList.add(validationObj.inactiveButtonClass);
    submitButtonElement.setAttribute("disabled", true);
}

const enableSubmitButton = (submitButtonElement,validationObj) => {
    submitButtonElement.classList.remove(validationObj.inactiveButtonClass);
    submitButtonElement.removeAttribute("disabled");
}

const toggleButtonState = (inputList, submitButtonElement,validationObj) => {
  const hasInvalidInput = inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    disableSubmitButton(submitButtonElement,validationObj);
  } else {
    enableSubmitButton(submitButtonElement,validationObj);
  }
};

const setEventListeners = (formElement,validationObj) => {
  const inputList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
  const submitButtonElement = formElement.querySelector(validationObj.submitButtonSelector);
  toggleButtonState(inputList, submitButtonElement,validationObj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement,validationObj);
      toggleButtonState(inputList, submitButtonElement,validationObj);
    });
  });
};

const enableValidation = (validationObj) => {

  const forms = document.querySelectorAll(validationObj.formSelector);

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement,validationObj);
  });
};

enableValidation(obj);
