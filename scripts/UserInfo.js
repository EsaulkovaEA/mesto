export default class UserInfo {
  constructor({nameInput, jobInput}) {
    this._nameInput = document.querySelector(nameInput);
    this._jobInput = document.querySelector(jobInput);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._nameInput.textContent,
      userJob: this._jobInput.textContent,
    };
  }
  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo = (inputValues) => {
    this._nameInput.textContent = inputValues.nameInput;
    this._jobInput.textContent = inputValues.jobInput;
    // this._nameInput.textContent = inputValues.nameInput;
    // this._jobInput.textContent = inputValues.jobInput;
  };
}
