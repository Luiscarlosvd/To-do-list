import _ from 'lodash';
import './style.css';
import Icon from './img/icons8-menú-2-50.png';
import refreshIcon from './img/icons8-sincronizar-24.png'
import arrowIcon from './img/icons8-abajo-izquierda-24.png'

const topToDoList = document.querySelector('#top')

const syncIcon = document.createElement('button');
const imgSyncIcon = document.createElement('img');
imgSyncIcon.src = refreshIcon;
syncIcon.classList.add('button-sync');
syncIcon.appendChild(imgSyncIcon);

topToDoList.appendChild(syncIcon);

const formAddTask = document.querySelector('#add-task');

const imgAdd = document.createElement('img');
imgAdd.src = arrowIcon;
imgAdd.classList.add('img-add');
formAddTask.appendChild(imgAdd);

let list = [
    {
        description: 'Clean the dishes',
        completed: false,
        index: 1,
    },
    {
        description: 'Wash my car',
        completed: false,
        index: 2,
    },
]

const render = () => {
    const listContainer = document.querySelector('.check-list')
    for(let i = 0; i < list.length; i++){
        
        const listElement = document.createElement('li');

        listElement.classList.add('list-task');

        const inputList = document.createElement('input');
        inputList.type = 'checkbox';
        inputList.id = 'task';
        inputList.checked = list[i].completed;
        listElement.appendChild(inputList);

        const descriptionTask = document.createElement('label');
        descriptionTask.classList.add('task-content');
        descriptionTask.contentEditable = 'true';
        descriptionTask.textContent = `${list[i].description}`
        listElement.appendChild(descriptionTask);

        inputList.addEventListener('click', () => {
            if(inputList.checked){
              descriptionTask.classList.add('hoverline');
              list[i].completed = true;
            } else {
              descriptionTask.classList.remove('hoverline');
              list[i].completed = false;
            }
        });

        const buttonTask = document.createElement('button');
        buttonTask.classList.add('button-more');
        listElement.appendChild(buttonTask);

        const buttonImage = document.createElement('img');
        buttonImage.src = Icon;
        buttonImage.classList.add('image-button-more');
        buttonTask.appendChild(buttonImage);

        list[i].index = i + 1;

        listContainer.appendChild(listElement);
    }
}

document.addEventListener('DOMContentLoaded', render);

