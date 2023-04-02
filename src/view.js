const render = (form, err) => {
  const rssField = document.querySelector('#url-input');
  if (err !== null) {
    const errorParagraph = document.querySelector('.text-danger');
    rssField.classList.add('is-invalid');
    errorParagraph.textContent = 'Ссылка должна быть валидным URL';
  } else {
    rssField.textContent = '';
    form.reset();
    rssField.focus();
  }
};

export default render;
