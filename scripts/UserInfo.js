export default class UserInfo {
  constructor({ nameInput, jobInput }) {
    this._nameInput = nameInput;
    this._jobInput = jobInput;
  }
  getUserInfo() {
    return {
      userName: this._nameInput.textContent,
      userJob: this._jobInput.textContent,
    };
  }
  setUserInfo(userName, userJob) {
    this._nameInput.textContent = userName;
    this._jobInput.textContent = userJob;
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
