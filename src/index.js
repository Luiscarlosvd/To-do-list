import _ from 'lodash'; // eslint-disable-line
import './style.css';

import refreshIcon from './img/icons8-sincronizar-24.png';
import arrowIcon from './img/icons8-abajo-izquierda-24.png';
import List from './modules/listClass.js';
import Task from './modules/taskClass.js';

const topToDoList = document.querySelector('#top');

const syncIcon = document.createElement('button');
const imgSyncIcon = document.createElement('img');
imgSyncIcon.src = refreshIcon;
syncIcon.classList.add('button-sync');
syncIcon.appendChild(imgSyncIcon);

topToDoList.appendChild(syncIcon);

const formAddTask = document.querySelector('#add-task');

const buttonAdd = document.createElement('button');
const imgAdd = document.createElement('img');
imgAdd.src = arrowIcon;
buttonAdd.classList.add('button-sync');
imgAdd.classList.add('img-add');
buttonAdd.appendChild(imgAdd);

formAddTask.appendChild(buttonAdd);

const title = document.getElementById('title');
const listContainer = document.querySelector('.check-list');

const taskList = new List(listContainer);

buttonAdd.addEventListener('click', (e) => {
  e.preventDefault();
  const task = new Task(title.value);
  taskList.addTask(task);
  taskList.render();
});

document.addEventListener('DOMContentLoaded', taskList.render());
