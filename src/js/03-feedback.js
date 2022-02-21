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
function getSavedInputs() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData === null || savedData === undefined) {
        return;
      }
    const parsedData = JSON.parse(savedData);
    if (parsedData.email) {
        refs.email.value = parsedData.email;
    }
    if (parsedData.message) {
        refs.message.value = parsedData.message;
    }
    formData = parsedData;
}
getSavedInputs();
function onFormSubmit(evt) {
    evt.preventDefault();
    if (refs.email.value === '' || refs.message.value === '') {
        alert('Все поля должны быть заполнены!');
    } else {
        evt.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY);
        console.log(formData);
        formData = {};
    }
}
