export default class UserInfo {
  constructor({ nameInput, jobInput, avatarInput }) {
    this._nameInput = document.querySelector(nameInput);
    this._jobInput = document.querySelector(jobInput);
    this._avatarInput = document.querySelector(avatarInput);
    this._id = "";
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._nameInput.textContent,
      userJob: this._jobInput.textContent,
      avatar: this._avatarInput.src,
      _id: this._id,
    };
  }
  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo = (inputValues) => {
    if (inputValues.name !== undefined)
      this._nameInput.textContent = inputValues.name;
    if (inputValues.about !== undefined)
      this._jobInput.textContent = inputValues.about;
    if (inputValues.avatar !== undefined)
      this._avatarInput.src = inputValues.avatar;
    this._id = inputValues._id;
  };
}
