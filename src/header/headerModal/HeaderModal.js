import modalTamplete from './templates/headerModal.hbs';
import {
  renderNews,
  visibleNews,
  savedNewsOnLocalStoreg,
} from '../../main/grid/Grid.js';
import { deleteOpenModal } from '../../main/modal/ModalDeleteNews.js';

const bodyContainerRef = document.querySelector('#root');

function restoreOpenModal() {
  const savedDate = localStorage.getItem('deletedDate');
  const parsedDate = JSON.parse(savedDate);

  if (parsedDate) {
    bodyContainerRef.insertAdjacentHTML('beforeend', modalTamplete(parsedDate));
    const close = document.querySelector('.header-card-close');
    const backdropRef = document.querySelector('.header-card-backdrop');

    backdropRef.addEventListener('click', windowOnClick);
    close.addEventListener('click', closeOnClick);

    const modalBtns = document.querySelectorAll('.header-list_item_news');
    restoreNews(modalBtns);
  } else {
    alert('Новостей нету');
  }
}

function restoreNews(array) {
  for (var i = 0, parent; (parent = array[i]); i++)
    parent.onclick = function (e) {
      if (e.target.id == 'restoreNews') {
        const id = this.id;
        const perent = document.getElementById(`${id}`);
        const titleRef = perent.querySelector('.header-list_title_news');
        const textRef = perent.querySelector('.header-list_description_news');

        const date = [
          {
            publishedAt: `${id}`,
            title: `${titleRef.textContent}`,
            description: `${textRef.textContent}`,
          },
        ];

        const savedDate = localStorage.getItem('deletedDate');
        const parsedNews = JSON.parse(savedDate);

        const newSavedDate = parsedNews.filter(
          (news) => news.publishedAt !== id
        );
        localStorage.setItem('deletedDate', JSON.stringify(newSavedDate));

        savedNewsOnLocalStoreg(date);
        renderNews(date);
        visibleNews();
        perent.remove();
        const deleteNewsBtns = document.querySelectorAll('.list_item_news');

        deleteOpenModal(deleteNewsBtns);
      }
    };
}

function windowOnClick(event) {
  if (event.target.className !== 'header-card-backdrop') {
    return;
  }
  event.target.remove();
}

function closeOnClick() {
  document.querySelector('.header-card-backdrop').remove();
}

export { restoreOpenModal };
