const editProfileButton = document.querySelector('.profile-info__edit-button')
const userName = document.querySelector('.profile-info__name')
const userJob = document.querySelector('.profile-info__job')
const profilePopup = document.querySelector('.popup')
const profilePopupCloseBtn = document.querySelector('.popup__close-button')
const formElement = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_about')

function clickEditProfileButtonHandler() {
    profilePopup.classList.add('popup_opened')
    nameInput.value = userName.textContent
    jobInput.value = userJob.textContent
}

function clickCloseProfilePopupButtonHandler() {
    profilePopup.classList.remove('popup_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value
    userJob.textContent = jobInput.value
    profilePopup.classList.remove('popup_opened')
}

editProfileButton.addEventListener('click', clickEditProfileButtonHandler)
profilePopupCloseBtn.addEventListener('click', clickCloseProfilePopupButtonHandler)
formElement.addEventListener('submit', formSubmitHandler);