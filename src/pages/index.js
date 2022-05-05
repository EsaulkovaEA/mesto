import "./index.css";
import { validatorConfig } from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
const popupProfileElement = document.querySelector(".popup_edit-profile");
const popupOpenProfileButtonElement = document.querySelector(
  ".profile__edit-button"
);
const formProfileElement = popupProfileElement.querySelector(".popup__form");
const nameInput = popupProfileElement.querySelector(".popup__input_type_name");
const jobInput = popupProfileElement.querySelector(".popup__input_type_job");

const popupPlaceElement = document.querySelector(".popup_add-place");
const formPlaceElement = popupPlaceElement.querySelector(".popup__form");
const popupOpenPlaceButtonElement = document.querySelector(
  ".profile__add-button"
);
const popupEditAvatar = document.querySelector(".popup_edit-avatar");
const formEditAvatar = popupEditAvatar.querySelector(".popup__form");
const popupOpenEditAvatarButtonElement = document.querySelector(
  ".profile__avatar-button"
);
const elementItems = document.querySelector(".places__list");

const formProfileElementValidator = new FormValidator(
  validatorConfig,
  formProfileElement
);
const formPlaceElementValidator = new FormValidator(
  validatorConfig,
  formPlaceElement
);

const formEditAvatartValidator = new FormValidator(
  validatorConfig,
  formEditAvatar
);

formProfileElementValidator.enableValidation();
formPlaceElementValidator.enableValidation();
formEditAvatartValidator.enableValidation();

const popupImage = new PopupWithImage(".popup_view-image");
popupImage.setEventListeners();

const popupDelete = new PopupWithConfirmation({
  popupSelector: ".popup_delete-card",
});
popupDelete.setEventListeners();

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-40",
  headers: {
    Authorization: "ec3562dc-38d6-49a4-b958-d2cdacbbc00f",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getProfileInfo(), api.getAllCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

const user = new UserInfo({
  nameInput: ".profile__title",
  jobInput: ".profile__subtitle",
  avatarInput: ".profile__avatar-img",
});
const popupProfile = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  handleFormSubmit: (data) => {
    popupProfile.setSubmitText("Сохранение...");
    api
      .editProfile(data)
      .then((res) => {
        user.setUserInfo(res);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupProfile.setSubmitText("Сохранить"));
  },
});
popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_edit-avatar",
  handleFormSubmit: (data) => {
    popupAvatar.setSubmitText("Сохранение...");
    api
      .editAvatar(data)
      .then((res) => {
        user.setUserInfo(res);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupAvatar.setSubmitText("Сохранить"));
  },
});
popupAvatar.setEventListeners();

const renderCard = (item) => {
  const card = new Card(
    item,
    { userId: user._id },
    "#cards-template",
    () => {
      popupImage.open(item.name, item.link);
    },
    (id) => {
      if (card.getLikes()) {
        api
          .deleteLike(id)
          .then((res) => card.setLikesCard(res.likes))
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(id)
          .then((res) => card.setLikesCard(res.likes))
          .catch((err) => {
            console.log(err);
          });
      }
    },
    (id) => {
      popupDelete.open();
      popupDelete.changeForm(() => {
        api
          .deleteCard(id)
          .then(() => {
            card.deleteCard();
            popupDelete.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
  return card.renderItem();
};

const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      cardList.addItem(renderCard(item));
    },
  },
  elementItems
);
// добавление карточки
function addCard(item) {
  popupPlace.setSubmitText("Создание...");
  api
    .addNewCard(item)
    .then((res) => {
      cardList.addItem(renderCard(res), true);
      formPlaceElementValidator.disableSubmitButton();
      popupPlace.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupPlace.setSubmitText("Создать"));
}
const popupPlace = new PopupWithForm({
  popupSelector: ".popup_add-place",
  handleFormSubmit: addCard,
});
popupPlace.setEventListeners();

//открытие попапа редактировать профиль
const openPopupProfile = () => {
  popupProfile.open();
  nameInput.value = user.getUserInfo().userName;
  jobInput.value = user.getUserInfo().userJob;
  formProfileElementValidator.disableSubmitButton();
  formProfileElementValidator.resetErrors();
};

popupOpenProfileButtonElement.addEventListener("click", openPopupProfile);

popupOpenPlaceButtonElement.addEventListener("click", function () {
  formPlaceElementValidator.resetErrors();
  popupPlace.open();
});
popupOpenEditAvatarButtonElement.addEventListener("click", function () {
  popupAvatar.open();
  formEditAvatartValidator.resetErrors();
  formEditAvatartValidator.disableSubmitButton();
});
