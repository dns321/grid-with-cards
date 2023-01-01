import fetchNews from './fetchAPI.js';
import gridTamplete from './templates/marcupGrid.hbs';
import newsTamplete from './templates/marcapNews.hbs';
import { deleteOpenModal } from '../modal/ModalDeleteNews.js';

const bodyContainerRef = document.querySelector('#root');

let page = 1;
let pageSize = 8;
let pageOne = 1;
let pageSizeOne = 1;

async function renderGrid() {
  const date = await fetchNews(page, pageSize);

  page += 1;
  pageSize = 4;
  pageOne += 8;

  const loadMoreBox1 = document.querySelector('[data-action="load-more"]');
  if (loadMoreBox1) {
    loadMoreBox1.remove();
  }

  localStorage.removeItem('savedNews');
  savedNewsOnLocalStoreg(date);

  handlerRenderGrid(date);
  localStorage.removeItem('deletedDate');

  const loadMoreBox = document.querySelector('[data-action="load-more"]');
  if (loadMoreBox) {
    infiniteObserver.observe(loadMoreBox);
  }

  const deleteNewsBtns = document.querySelectorAll('.list_item_news');
  deleteOpenModal(deleteNewsBtns);
}

function handlerRenderGrid(date) {
  renderNews(date);
  visibleNews();
}

async function renderOneNews() {
  const date = await fetchNews(pageOne, pageSizeOne);

  page = 1;
  pageSize = 8;
  pageOne += 1;

  savedNewsOnLocalStoreg(date);

  if (date.length > 0) {
    renderNews(date);
  } else {
    alert('Статті закінчились');
  }

  const deleteNewsBtns = document.querySelectorAll('.list_item_news');
  deleteOpenModal(deleteNewsBtns);

  setTimeout(() => {
    visibleNews();
  }, 3000);
}

function visibleNews() {
  const imgNews = document.querySelectorAll('.news_img');
  const wrapNews = document.querySelectorAll('.wrap_news');

  imgNews.forEach((element) => element.remove());
  wrapNews.forEach((element) => element.classList.remove('hidden'));
}

function renderNews(date) {
  const listNews = document.querySelector('.list_news');

  if (!listNews) {
    const markap = gridTamplete(date);
    bodyContainerRef.insertAdjacentHTML('beforeend', markap);
  } else {
    const markap = newsTamplete(date);
    listNews.insertAdjacentHTML('beforeend', markap);
  }
}

function deleteOneNews() {
  const newsItemRef = document.querySelectorAll('.list_item_news');

  newsItemRef.forEach((element, index) => {
    const namberNews = newsItemRef.length - 1;
    if (index === namberNews) {
      updateSavedLocalAfteDelete(element.id);
      recordLocalStoreg(element);

      element.remove();
    }
  });
}

function toggleSwitcher() {
  const switchAdd_allNews = document.querySelector('.theme-switch__track');
  const switchDot = document.querySelector('.theme-switch__marker');

  switchAdd_allNews.classList.toggle('checked__track');
  switchDot.classList.toggle('checked__marker');

  page = 1;
  pageSize = 8;
}

const infiniteObserver = new IntersectionObserver(([entry], observer) => {
  if (entry.isIntersecting) {
    loadMoreNews();
  }
});

async function loadMoreNews() {
  const date = await fetchNews(page, pageSize);
  page += 1;
  pageSize = 4;
  pageOne += 4;

  if (date.length > 0) {
    handlerRenderGrid(date);
    const deleteNewsBtns = document.querySelectorAll('.list_item_news');
    deleteOpenModal(deleteNewsBtns);
  } else {
    alert('Статті закінчились');
  }

  savedNewsOnLocalStoreg(date);
}

function recordLocalStoreg(element) {
  const titleRef = element.querySelector('.list_title_news');
  const textRef = element.querySelector('.list_description_news');

  let dateArr = [];
  if (localStorage.getItem('deletedDate')) {
    dateArr = JSON.parse(localStorage.getItem('deletedDate'));
  }
  const date = {
    publishedAt: `${element.id}`,
    title: `${titleRef.textContent}`,
    description: `${textRef.textContent}`,
  };
  dateArr.push(date);

  localStorage.setItem('deletedDate', JSON.stringify(dateArr));
}

function savedNewsOnLocalStoreg(date) {
  let savedLocalNews = [];
  if (localStorage.getItem('savedNews')) {
    savedLocalNews = JSON.parse(localStorage.getItem('savedNews'));
  }
  savedLocalNews = savedLocalNews.concat(date);
  localStorage.setItem('savedNews', JSON.stringify(savedLocalNews));
}

function updateSavedLocalAfteDelete(id) {
  const savedDate = localStorage.getItem('savedNews');
  const parsedNews = JSON.parse(savedDate);

  const newSavedDate = parsedNews.filter((news) => news.publishedAt !== id);

  localStorage.setItem('savedNews', JSON.stringify(newSavedDate));
}

function updatePage() {
  const savedLocalNews = localStorage.getItem('savedNews');
  const parsedSavedLocalNews = JSON.parse(savedLocalNews);
  handlerRenderGrid(parsedSavedLocalNews);
  const deleteNewsBtns = document.querySelectorAll('.list_item_news');
  deleteOpenModal(deleteNewsBtns);
}

export {
  renderGrid,
  renderOneNews,
  deleteOneNews,
  toggleSwitcher,
  recordLocalStoreg,
  renderNews,
  visibleNews,
  updatePage,
  updateSavedLocalAfteDelete,
  savedNewsOnLocalStoreg,
};
