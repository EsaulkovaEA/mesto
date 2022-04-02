export const popupOpenImage = document.querySelector(".popup_view-image");
export const popupImageElement = popupOpenImage.querySelector(".popup__image");
export const popupCaptionElement = popupOpenImage.querySelector(".popup__caption");

// открытие попапов
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", clickEscClose);
};

//закрытие нажатием ESC
export const clickEscClose = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};
// закрытие попапов
export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", clickEscClose);
};
