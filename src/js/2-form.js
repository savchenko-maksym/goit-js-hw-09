const STORAGE_KEY = 'feedback-form-state';

const formData = { email: '', message: '' };

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('input', e => {
  formData.email = e.currentTarget.elements.email.value.trim();
  formData.message = e.currentTarget.elements.message.value.trim();
  saveToLS(STORAGE_KEY, formData);
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const body = localStorage.getItem(key);
  try {
    const data = JSON.parse(body);
    return data;
  } catch {
    return body;
  }
}

function initPage() {
  const formData = loadFromLS(STORAGE_KEY);
  refs.form.elements.email.value = formData?.email || '';
  refs.form.elements.message.value = formData?.message || '';
}

initPage();

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  if (formData.email === '' || formData.message === '') {
    return alert('Fill please all fields');
  }
  formData.email = e.currentTarget.elements.email.value.trim();
  formData.message = e.currentTarget.elements.message.value.trim();
  console.log(formData);
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
});
