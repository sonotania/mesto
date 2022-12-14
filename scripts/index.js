const editProfileButton = document.querySelector(".profile-info__edit-button");
const addButton = document.querySelector(".profile__add-button");
const userName = document.querySelector(".profile-info__name");
const userJob = document.querySelector(".profile-info__job");
const profilePopup = document.querySelector(".popup_type_edit");
const profilePopupCloseBtn = document.querySelector("#edit-close");
const addPopup = document.querySelector(".popup_type_add");
const addPopupCloseBtn = document.querySelector("#add-close");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseBtn = document.querySelector("#image-close");
const imagePopupBackground = imagePopup.querySelector(".popup__image");
const imagePopupPlaceName = imagePopup.querySelector(".popup__place-name");
const editFormElement = document.forms.edit;
const addFormElement = document.forms.add;
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.about;
const elementsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;


function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}


function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function openImagePopupHandler(event) {
  openPopup(imagePopup);


  imagePopupBackground.setAttribute("src", event.target.src);
  imagePopupBackground.setAttribute("alt", event.target.alt);

  imagePopupPlaceName.textContent = event.target.alt;
}

function deleteCardHandler(event) {
  elementsContainer.removeChild(event.target.closest(".element"));
}

function likeCardHandler(event) {
  event.target.classList.toggle("element__like-button_liked");
}


function createCard(name, link) {
  const card = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = card.querySelector(".element__image");
  const cardTitle = card.querySelector(".element__title");
  const cardDeleteBtn = card.querySelector(".element__delete-button");
  const cardLikeBtn = card.querySelector(".element__like-button");


  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener("click", openImagePopupHandler);

  cardTitle.textContent = name;

  cardDeleteBtn.addEventListener("click", deleteCardHandler);

  cardLikeBtn.addEventListener("click", likeCardHandler);

  return card;
}


function addNewCard(cardElement) {
  const cardsContainer = document.querySelector(".elements");

  cardsContainer.prepend(cardElement);
}

function initCards() {
  const initialCards = [
    {
      name: "??????????",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "?????????????????????? ??????????????",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "??????????????",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "????????????????",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "???????????????????????? ??????????",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "????????????",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  initialCards.forEach((item) => {

    const cardInstance = createCard(item.name, item.link);

    addNewCard(cardInstance);
  });
}

function clickEditProfileButtonHandler() {
  openPopup(profilePopup);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function clickProfilePopupCloseBtnHandler() {
  closePopup(profilePopup);
}

function clickAddButtonHandler() {
  openPopup(addPopup);
}

function clickAddPopupCloseBtnHandler() {
  closePopup(addPopup);
}

function clickImagePopupCloseBtnHandler() {
  closePopup(imagePopup);
}

function editFormSubmitHandler(event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

function addFormSubmitHandler(event) {
  const placeInput = addFormElement.elements.place;
  const linkInput = addFormElement.elements.link;
  
  const cardInstance = createCard(placeInput.value, linkInput.value);

  event.preventDefault();

  addNewCard(cardInstance);
  placeInput.value = "";
  linkInput.value = "";
  closePopup(addPopup);
}

editProfileButton.addEventListener("click", clickEditProfileButtonHandler);
profilePopupCloseBtn.addEventListener(
  "click",
  clickProfilePopupCloseBtnHandler
);

addButton.addEventListener("click", clickAddButtonHandler);
addPopupCloseBtn.addEventListener("click", clickAddPopupCloseBtnHandler);

imagePopupCloseBtn.addEventListener("click", clickImagePopupCloseBtnHandler);

editFormElement.addEventListener("submit", editFormSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);

initCards();
