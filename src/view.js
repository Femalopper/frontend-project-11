import i18next from 'i18next';

const render = (form, err) => {
  console.log(err);
  const rssField = document.querySelector('#url-input');
  const errorParagraph = document.querySelector('.text-danger');
  if (err === 'duplicate_rss_error' || err === 'invalid_url_error') {
    rssField.classList.add('is-invalid');
    errorParagraph.textContent = i18next.t(err);
  } else {
    rssField.textContent = '';
    rssField.classList.remove('is-invalid');
    errorParagraph.textContent = '';
    form.reset();
    rssField.focus();
  }
};

export default render;
