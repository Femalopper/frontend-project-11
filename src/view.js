const render = (form, err) => {
  const rssField = document.querySelector('#url-input');
  const errorParagraph = document.querySelector('.text-danger');
  if (err !== null) {
    rssField.classList.add('is-invalid');
    errorParagraph.textContent = 'Ссылка должна быть валидным URL';
  } else {
    rssField.textContent = '';
    rssField.classList.remove('is-invalid');
    errorParagraph.textContent = '';
    form.reset();
    rssField.focus();
  }
};

export default render;
