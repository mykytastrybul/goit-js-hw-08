import throttle from 'lodash.throttle';
const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    message: document.querySelector('.feedback-form textarea'),
};
const STORAGE_KEY = 'feedback-form-state';
let formData = {};
refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);
function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
getSavedInputs();
function getSavedInputs() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedData);
    if (parsedData.email) {
        refs.email.value = parsedData.email;
    }
    if (parsedData.message) {
        refs.message.value = parsedData.message;
    }
    formData = parsedData;
}
function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
    formData = {};
}
