const editProfileButton = document.querySelector(".profile-info__edit-button");
const addButton = document.querySelector(".profile__add-button");
const userName = document.querySelector(".profile-info__name");
const userJob = document.querySelector(".profile-info__job");
const profilePopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_add");
const profilePopupCloseBtn = document.querySelector("#edit-close");
const editFormElement = document.forms.edit;
const addFormElement = document.forms.add;
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.about;
const addPopupCloseBtn = document.querySelector("#add-close");
const elementsContainer = document.querySelector(".elements");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseBtn = document.querySelector("#image-close");

function addNewCard(name, link) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardsContainer = document.querySelector(".elements");

  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector(".element__title").textContent = name;
  cardsContainer.prepend(cardElement);
}

function initCards() {
  const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  initialCards.forEach((item) => {
    addNewCard(item.name, item.link);
  });
}

function clickEditProfileButtonHandler() {
  profilePopup.classList.add("popup_opened");
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function clickAddButtonHandler() {
  addPopup.classList.add("popup_opened");
}

function closeProfilePopup() {
  profilePopup.classList.remove("popup_opened");
}

function closeAddPopup() {
  addPopup.classList.remove("popup_opened");
}

function closeImagePopup() {
  imagePopup.classList.remove("popup_opened");
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closeProfilePopup();
}

function addFormSubmitHandler(evt) {
  const placeInput = addFormElement.elements.place;
  const linkInput = addFormElement.elements.link;

  evt.preventDefault();
  addNewCard(placeInput.value, linkInput.value);
  placeInput.value = "";
  linkInput.value = "";
  closeAddPopup();
}

function openImagePopupHandler(bgImageSrc) {
  const bgImage = imagePopup.querySelector(".popup__image");

  imagePopup.classList.add("popup_opened");
  bgImage.setAttribute("src", bgImageSrc);
}

function elementsContainerClickHandler(event) {
  if (event.target.classList.contains("element__like-button")) {
    event.target.classList.toggle("element__like-button_liked");
  } else if (event.target.classList.contains("element__delete-button")) {
    elementsContainer.removeChild(event.target.closest(".element"));
  } else if (event.target.classList.contains("element__image")) {
    openImagePopupHandler(event.target.src);
  }
}

editProfileButton.addEventListener("click", clickEditProfileButtonHandler);
addButton.addEventListener("click", clickAddButtonHandler);
profilePopupCloseBtn.addEventListener("click", closeProfilePopup);
addPopupCloseBtn.addEventListener("click", closeAddPopup);
imagePopupCloseBtn.addEventListener("click", closeImagePopup);
editFormElement.addEventListener("submit", editFormSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);
elementsContainer.addEventListener("click", elementsContainerClickHandler);
initCards();
