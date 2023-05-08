import './style.css';
import refreshIcon from './img/icons8-sincronizar-24.png';
import arrowIcon from './img/icons8-abajo-izquierda-24.png';
import List from './modules/listClass.js'; // eslint-disable-line
import Task from './modules/taskClass.js';

/* Sync Button */

const topToDoList = document.querySelector('#top');
const syncIcon = document.createElement('button');
const imgSyncIcon = document.createElement('img');
imgSyncIcon.src = refreshIcon;
syncIcon.classList.add('button-sync');
syncIcon.appendChild(imgSyncIcon);
topToDoList.appendChild(syncIcon);

/* Add task button */

const formAddTask = document.querySelector('#add-task');
const buttonAdd = document.createElement('button');
buttonAdd.type = 'submit';
const imgAdd = document.createElement('img');
imgAdd.src = arrowIcon;
buttonAdd.classList.add('button-sync');
imgAdd.classList.add('img-add');
buttonAdd.appendChild(imgAdd);
formAddTask.appendChild(buttonAdd);

const title = document.getElementById('title');
const container = document.querySelector('.check-list');

export default container;

const taskList = new List();

taskList.render();

formAddTask.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = new Task(title.value);
  taskList.addTask(task);
  taskList.render();
  title.value = '';
});

const clearButton = document.getElementById('button-clear');

clearButton.addEventListener('click', () => {
  taskList.clearCompletedTask();
  taskList.render();
});
