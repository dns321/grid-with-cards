import modalTamplete from './templates/marcupModal.hbs';
import { recordLocalStoreg, updateSavedLocalAfteDelete } from '../grid/Grid.js';
const bodyContainerRef = document.querySelector('#root');

function deleteOpenModal(array) {
  for (var i = 0, parent; (parent = array[i]); i++)
    parent.onclick = function (e) {
      if (e.target.id == 'delete_news') {
        const id = this.id;
        updateSavedLocalAfteDelete(id);
        const perent = document.getElementById(`${id}`);
        recordLocalStoreg(perent);

        document.getElementById(`${id}`).remove();
      }
      if (e.target.id == 'dop_ifo') {
        const id = this.id;
        const perent = document.getElementById(`${id}`);
        const titleRef = perent.querySelector('.list_title_news');
        const textRef = perent.querySelector('.list_description_news');

        const date = [
          {
            title: `${titleRef.textContent}`,
            description: `${textRef.textContent}`,
          },
        ];

        bodyContainerRef.insertAdjacentHTML('beforeend', modalTamplete(date));
        const close = document.querySelector('.card-close');
        const backdropRef = document.querySelector('.card-backdrop');

        backdropRef.addEventListener('click', windowOnClick);
        close.addEventListener('click', closeOnClick);
      }
    };
}

function windowOnClick(event) {
  if (event.target.className !== 'card-backdrop') {
    return;
  }
  event.target.remove();
}

function closeOnClick() {
  document.querySelector('.card-backdrop').remove();
}

export { deleteOpenModal };
