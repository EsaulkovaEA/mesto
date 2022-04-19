export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose=this._handleOverlayClose.bind(this);
  }
  // открытие попапов
  open() {
    this._popup.classList.add("popup_opened");
  }
  // закрытие попапов
  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners();
  }
  //закрытие кликом на оверлей и крестик
  _handleOverlayClose(event) {
    if (
      event.target.classList.contains("popup_opened") ||
      event.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  }
  //закрытие нажатием ESC
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popup.addEventListener("click", this._handleOverlayClose);
    document.addEventListener("keydown", this._handleEscClose);
  }

  _removeEventListeners() {
    this._popup.removeEventListener("click", this._handleOverlayClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
