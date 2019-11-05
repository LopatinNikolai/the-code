import 'babel-polyfill';
import 'core-js';
import polyfill from 'smoothscroll-polyfill';

polyfill.polyfill();

async function sendFileDataMock(file) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), 2000);
    });
}
async function getDecisionMocked() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random(0, 1) >= 0.5) {
                resolve({
                    status: 200,
                    documentType: 'Ваш файл'
                });
            } else {
                reject(new Error('Отклонено'));
            }
        }, 2000);
    });
}

const states = {
    approved: {},
    rejected: {},
    checking: {}
};

class FileForm {
  fileCheck = document.createElement('div');

  animation = document.createElement('div');

  status = document.createElement('div');

  img = document.createElement('img');

  loading = document.createElement('p');

  info = document.createElement('p');

  statusText = document.createElement('p');

  fileLabel = document.createElement('label');

  input = document.createElement('input');

  event = null;

  constructor(eventName) {
      this.event = document.createEvent('Event');
      this.event.initEvent(eventName, true, true);
      this.setAttribute();
  }

  setAttribute = () => {
      this.fileCheck.className = 'fileCheck';
      this.animation.className = 'animation';
      this.status.className = 'status';
      this.img.className = 'state';
      this.loading.className = 'loading';
      this.info.className = 'info';
      this.statusText.className = 'results';
      this.fileLabel.className = 'fileLabel';
      this.input.className = 'none';
      this.input.id = 'file';
      this.fileLabel.setAttribute('for', 'file');
      this.loading.innerText = 'Загрузить скан страницы с фотографией';
      this.info.innerText = 'Размер файла не более 5Мб';

      this.input.setAttribute('type', 'file');
      this.input.setAttribute('accept', 'image/*');

      this.input.addEventListener('change', this.handleChange, false);

      this.img.src = '/assets/img/upload.svg';
  };

  getDOMNode() {
      this.fileCheck.appendChild(this.input);
      this.fileLabel.appendChild(this.loading);
      this.fileLabel.appendChild(this.info);

      this.status.appendChild(this.statusText);

      this.animation.appendChild(this.img);

      this.fileCheck.appendChild(this.animation);
      this.fileCheck.appendChild(this.fileLabel);
      this.fileCheck.appendChild(this.status);
      return this.fileCheck;
  }

  setActive = () => {
      this.img.classList.add('hide');
      this.animation.classList.add('loader');
  };

  setChecking = () => {
      this.img.classList.remove('hide');
      this.animation.classList.remove('loader');
      this.img.src = '/assets/img/wait.svg';
      this.loading.innerText = 'Файл загружен';
      this.info.innerText = this.input.files[0].name;
      this.statusText.innerText = 'Идет проверка';
      this.statusText.className = 'expectation';
  };

  rejected = () => {
      this.img.src = '/assets/img/upload.svg';
      this.statusText.innerText = 'Отклонено';
      this.statusText.className = 'results';
      this.loading.innerText = 'Загрузить скан страницы с фотографией';
      this.info.innerText = 'Размер файла не более 5Мб';
  };

  approved = (documentType) => {
      this.img.src = '/assets/img/ok.svg';
      this.statusText.innerText = 'Проверено';
      this.statusText.className = 'checked';
      this.loading.innerText = documentType;
      this.info.innerText = this.input.files[0].name;
  };

  getDecisionStatus = async () => {
      try {
          const response = await getDecisionMocked();
          this.approved(response.documentType);
          document.dispatchEvent(this.event);
          this.fileLabel.removeAttribute('for');
      } catch (e) {
          this.rejected();
      }
  };

  handleChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
          try {
              this.setActive();
              await sendFileDataMock(file);
              this.setChecking(file.name);
              await this.getDecisionStatus();
          } catch (e) {
              console.log(e);
          }
          this.input.value = null;
      }
  };
}

function createNewInstance() {
    const inst = new FileForm('createNewInstanse');
    document
        .querySelector('.content')
        .insertBefore(
            inst.getDOMNode(),
            document.querySelector('.content').childNodes[0]
        );
}

function init() {
    document.addEventListener('createNewInstanse', createNewInstance);
    const event = document.createEvent('Event');
    event.initEvent('createNewInstanse', true, true);
    document.dispatchEvent(event);
}

init();
