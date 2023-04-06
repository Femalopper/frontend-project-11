const posts = document.querySelector('.posts');
const feeds = document.querySelector('.feeds');
const rssField = document.querySelector('#url-input');
const errorParagraph = document.querySelector('.feedback');

const modalRender = (state, linkId) => {
  const reviewedPost = state.rssForm.posts.filter(({ id }) => +id === +linkId);
  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = reviewedPost[0].postTitle;
  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = reviewedPost[0].postDescription;
  const read = document.querySelector('.full-article');
  read.setAttribute('href', reviewedPost[0].href);
};

const formRender = (i18nextInstance, form) => {
  posts.innerHTML = '';
  feeds.innerHTML = '';
  rssField.textContent = '';
  rssField.classList.remove('is-invalid');
  errorParagraph.classList.remove('text-danger');
  errorParagraph.classList.add('text-success');
  errorParagraph.textContent = i18nextInstance.t('success');
  form.reset();
  rssField.focus();
};

const cardRender = (target) => {
  const card = document.createElement('div');
  target.appendChild(card);
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  card.appendChild(cardBody);
  cardBody.classList.add('card-body');
  const cardTitle = document.createElement('h2');
  cardBody.appendChild(cardTitle);
  cardTitle.classList.add('card-title', 'h4');
  return cardTitle;
};

const postsRender = (i18nextInstance, state) => {
  posts.innerHTML = '';
  const cardTitle = cardRender(posts);
  cardTitle.textContent = 'Посты';
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  state.rssForm.posts.map(({ id, postTitle, href, status }) => {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    );
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('data-id', id);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    if (status === 'unread') {
      a.classList.add('fw-bold');
    } else {
      a.classList.add('fw-normal', 'link-secondary');
    }
    a.textContent = postTitle;
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18nextInstance.t('review');
    button.before(a);
    li.append(a, button);
    ul.append(li);
    return true;
  });
  cardTitle.parentNode.after(ul);
};

const feedsRender = (state) => {
  const cardTitle = cardRender(feeds);
  cardTitle.textContent = 'Фиды';
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  state.rssForm.feeds.map(({ feedTitle, feedDescription }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = feedTitle;
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.innerHTML = feedDescription;
    p.before(h3);
    li.append(h3, p);
    ul.append(li);
    return true;
  });
  cardTitle.parentNode.after(ul);
};

const errorsRender = (i18nextInstance, state) => {
  if (
    state.rssForm.error === 'duplicate_rss_error'
    || state.rssForm.error === 'invalid_url_error'
  ) {
    errorParagraph.classList.remove('text-success');
    errorParagraph.classList.add('text-danger');
    rssField.classList.add('is-invalid');
    errorParagraph.textContent = i18nextInstance.t(state.rssForm.error);
  }
  if (
    state.rssForm.error === 'parse_error'
    || state.rssForm.error === 'network_error'
    || state.rssForm.error === 'empty_field_error'
  ) {
    rssField.classList.remove('is-invalid');
    errorParagraph.classList.add('text-danger');
    errorParagraph.textContent = i18nextInstance.t(state.rssForm.error);
  }
};

export { formRender, feedsRender, postsRender, errorsRender, modalRender };
