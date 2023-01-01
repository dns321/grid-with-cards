import headerTamplete from './templates/marcapHeader.hbs';
import {
  renderGrid,
  renderOneNews,
  deleteOneNews,
  toggleSwitcher,
} from '../main/grid/Grid.js';
import { restoreOpenModal } from '../header/headerModal/HeaderModal.js';

const headerContainerRef = document.querySelector('#header');

function renderHeader() {
  const markap = headerTamplete();

  headerContainerRef.insertAdjacentHTML('beforeend', markap);

  const addNews = document.querySelector('#add');
  const deleteNews = document.querySelector('#delete');
  const switchAdd_allNews = document.querySelector('#switch-toggle');
  const cleenNews = document.querySelector('#cleen');
  const modal = document.querySelector('#modal');

  switchAdd_allNews.addEventListener('change', renderNews);
  cleenNews.addEventListener('click', handlerCleenNews);
  addNews.addEventListener('click', renderOneNews);
  deleteNews.addEventListener('click', deleteOneNews);
  modal.addEventListener('click', restoreOpenModal);
}

function renderNews() {
  const switchAdd_allNews = document.querySelector('#switch-toggle');
  const newsItemRef = document.querySelector('.list_news');

  if (!switchAdd_allNews.classList.contains('checked')) {
    if (newsItemRef) {
      newsItemRef.remove();
      switchAdd_allNews.classList.toggle('checked');
      toggleSwitcher();
      renderGrid();
    } else {
      switchAdd_allNews.classList.toggle('checked');
      toggleSwitcher();
      renderGrid();
    }
  } else {
    switchAdd_allNews.classList.toggle('checked');
    const newsContainerRef = document.querySelector('.list_news');
    const actionLoadMore = document.querySelector('[data-action="load-more"]');
    toggleSwitcher();
    newsContainerRef.remove();
    actionLoadMore.remove();
  }
}

function handlerCleenNews() {
  const newsItemRef = document.querySelectorAll('.list_item_news');
  const switchAdd_allNews = document.querySelector('#switch-toggle');

  if (newsItemRef.length > 0) {
    newsItemRef.forEach((element, index) => {
      if (index > 0) {
        element.remove();
        toggleSwitcher();
        switchAdd_allNews.classList.toggle('checked');
      }
    });
    const actionLoadMore = document.querySelector('[data-action="load-more"]');
    actionLoadMore.remove();
  }
}

export default renderHeader;
