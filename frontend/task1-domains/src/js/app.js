import 'core-js';
import polyfill from 'smoothscroll-polyfill';

polyfill.polyfill();

function setActive() {
    const sections = ['section1', 'section2', 'section3'];
    const buttons = document.querySelectorAll('div.block');
    buttons.forEach((button, index) => {
        button.addEventListener('click', function (event) {
            buttons.forEach((button1) => {
                button1.classList.remove('block--active');
            });
            button.classList.add('block--active');
            scroll(sections[index]);
        });
    });
}
function downActive() {
    const buttons = document.querySelectorAll('div.block');
    const down = document.querySelector('.down');
    down.addEventListener('click', function (event) {
        buttons.forEach((button) => {
            button.classList.remove('block--active');
        });
        buttons[1].classList.add('block--active');
        scroll('section2');
    });
}
function scroll(part) {
    const section = document.getElementById(part).getBoundingClientRect();
    window.scrollTo({
        top: section.top + window.pageYOffset,
        behavior: 'smooth'
    });
}
function a() {
    const buttons = document.querySelectorAll('.item');
    const descriptions = document.querySelectorAll('.description');
    const descriptionWrappers = document.querySelectorAll('.description-wrapper');
    const itemsContainer = document.querySelector('.grid');
    buttons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            const i = Array.from(buttons).indexOf(event.currentTarget);
            const { height } = descriptions[i].getBoundingClientRect();
            if (descriptionWrappers[i].style.height !== '0px') {
                descriptionWrappers[i].style.height = 0;
                button.style = 'margin-bottom: 0px';
                return;
            }
            buttons.forEach((button1) => {
                button1.style = 'margin-bottom: 0px';
            });
            descriptionWrappers.forEach((container) => {
                button.style = 'margin-bottom: 0px';
                container.style.height = 0;
            });

            buttons[i].style = `margin-bottom: ${height}px`;
            descriptionWrappers[i].style = `height: ${height}px;
           width:${itemsContainer.getBoundingClientRect().width}px;`;
        });
    });
}

function active() {
    setActive();
    a();
    downActive();
}
active();
