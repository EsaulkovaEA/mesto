// const enableValidation = [{
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// }];

const showError = (formElement,inputElement,errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    console.log(errorElement.textContent);
    errorElement.classList.add('popup__input_type_error');

//   input.classList.add('popup__input-error');
};

const hideError = (formElement,inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove('popup__input_type_error');

//   input.classList.remove('popup__input-error');
};

const checkInputValidity = (formElement,inputElement) => {
    console.log(inputElement.validity);
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showError(formElement,inputElement,errorMessage);
    }
    else {
        hideError(formElement,inputElement);
    }
}

const setEventListeners = (formElement) => {
    const inputSelector = formElement.querySelectorAll('.popup__input');

    inputSelector.forEach((inputElement) => {
        inputElement.addEventListener('input',(event) =>{
            console.log(event.target.name,event.target.value);
            checkInputValidity(formElement,inputElement);
        });
    });
};


const enableValidation = () => {
    const formSelector = document.querySelectorAll(".popup__form");


    formSelector.forEach((formElement) => {
        formElement.addEventListener('submit',(event) =>{
            event.preventDefault();
        });
        setEventListeners(formElement);
    });
};

enableValidation();