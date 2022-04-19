export default class UserInfo {
  constructor(nameInput, jobInput) {
    this._nameInput = document.querySelector(nameInput);
    this._jobInput = document.querySelector(jobInput);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      'userName': this._nameInput.textContent,
      'userJob': this._jobInput.textContent,
    };
  }
  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(inputValues) {
    this._nameInput.textContent = inputValues.userName;
    this._jobInput.textContent = inputValues.userJob;
    console.log(inputValues);
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

// export default class UserInfo {
//   constructor({ nameSelector, selfInfoSelector}) {
//       this._nameSelector = nameSelector;
//       this._selfInfoSelector = selfInfoSelector;
//   }

//   getUserInfo() {
//       this._userName = document.querySelector(this._nameSelector);
//       this._userInfo = document.querySelector(this._selfInfoSelector);
//       this._user = { userName: this._userName.textContent, userJob: this._userInfo.textContent };
//       return this._user;
//   }

//   setUserInfo(data) {
//       this._userName.textContent = data.userName;
//       this._userInfo.textContent = data.userJob;
//   }
// }
