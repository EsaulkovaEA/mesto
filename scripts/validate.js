// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   });

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input_type_error");

  //   input.classList.add('popup__input-error');
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input_type_error");

  //   input.classList.remove('popup__input-error');
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

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
//   }

const toggleButtonState = (inputList, submitButtonElement) => {
  const hasInvalidInput = Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    submitButtonElement.classList.add("popup__button_inactive");
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove("popup__button_inactive");
    submitButtonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement) => {
  const inputSelector = formElement.querySelectorAll(".popup__input");
  const submitButtonSelector = formElement.querySelector(".popup__button");
  toggleButtonState(inputSelector, submitButtonSelector);

  inputSelector.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputSelector, submitButtonSelector);
    });
  });
};

const enableValidation = () => {
  const formSelector = document.querySelectorAll(".popup__form");

  formSelector.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
