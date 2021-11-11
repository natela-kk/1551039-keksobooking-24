const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarInput = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const offerInput = document.querySelector('.ad-form__input');
const offerImg = document.createElement('img');
const offerPreview = document.querySelector('.ad-form__photo');
offerImg.classList.add('ad-form__photo');
offerPreview.appendChild(offerImg);

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.querySelector('img').src = URL.createObjectURL(file);
  }
});

offerInput.addEventListener('change', () => {
  const file = offerInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    offerImg.src = URL.createObjectURL(file);
  }
});
