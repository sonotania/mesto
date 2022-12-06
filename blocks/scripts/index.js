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

// Общая функция открытия попапа. Принимает на вход попап
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

// Общая функция закрытия попапа. Принимает на вход попап
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function openImagePopupHandler(event) {
  openPopup(imagePopup);

  // Текст для названия места и для атрибута alt большого изображения берём из атрибута alt миниатюры. Event.target - миниатюра
  imagePopupBackground.setAttribute("src", event.target.src);
  imagePopupBackground.setAttribute("alt", event.target.alt);
  // Для place-name создал css-файл popup__place-name. Стили там наугад написаны. Надо взять из фигмы
  imagePopupPlaceName.textContent = event.target.alt;
}

function deleteCardHandler(event) {
  elementsContainer.removeChild(event.target.closest(".element"));
}

function likeCardHandler(event) {
  event.target.classList.toggle("element__like-button_liked");
}

// Функция создания карточки, которая возвращает созданный элемент карточки
function createCard(name, link) {
  const card = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = card.querySelector(".element__image");
  const cardTitle = card.querySelector(".element__title");
  const cardDeleteBtn = card.querySelector(".element__delete-button");
  const cardLikeBtn = card.querySelector(".element__like-button");

  // Как и попросил ревьюер, навешиваем слушатели событий на сердечко, корзину и миниатюру тут - при создании карточки.
  // В итоге будет куча слушателей в документе. Когда мы учились, нам говорили, что так не гуд, что лучше повесить один слушатель на весь контейнер.
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener("click", openImagePopupHandler);

  cardTitle.textContent = name;

  cardDeleteBtn.addEventListener("click", deleteCardHandler);

  cardLikeBtn.addEventListener("click", likeCardHandler);

  return card;
}

// Функция добавления новой карточки в контейнер, принимающая на вход созданный экземпляр карточки
function addNewCard(cardElement) {
  const cardsContainer = document.querySelector(".elements");

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
    // Сначала создаём карточку
    const cardInstance = createCard(item.name, item.link);

    // Теперь добавляем её в контейнер
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
  // Сначала создаём карточку
  const cardInstance = createCard(placeInput.value, linkInput.value);

  event.preventDefault();
  // Теперь добавляем её в контейнер
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
