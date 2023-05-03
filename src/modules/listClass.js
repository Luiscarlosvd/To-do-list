import { forEach } from 'lodash';
import Icon from '../img/icons8-menú-2-50.png';
import trashIcon from '../img/icons8-basura-32.png';

export default class taskList {
  constructor(container) {
    this.list = [];
    this.container = container;
  }

  addTask(task) {
    if (localStorage.getItem('localData') === null) {
      localStorage.setItem('localData', JSON.stringify([]));
      this.list.push(task);
      localStorage.setItem('localData', JSON.stringify(this.list));
      window.location = window.location.pathname;
    } else {
      this.list = JSON.parse(localStorage.getItem('localData'));
      this.list.push(task);
      localStorage.setItem('localData', JSON.stringify(this.list));
      window.location = window.location.pathname;
    }
  }


  modifiedTask(newDescription, index){
    this.list = JSON.parse(localStorage.getItem('localData'));
    this.list.forEach((task) => {
        if(task.index == index){
            task.description = newDescription;
        }
    })
    localStorage.setItem('localData', JSON.stringify(this.list));
  }

  removeTask(index){
    this.list = JSON.parse(localStorage.getItem('localData'));
    this.list = this.list.filter((task) => task.index !== index);
    localStorage.setItem('localData', JSON.stringify(this.list));
    window.location = window.location.pathname;
  }
  

  render() {
    this.list = JSON.parse(localStorage.getItem('localData'));
    for (let i = 0; i < this.list.length; i += 1) {
      const listElement = document.createElement('li');

      listElement.classList.add('list-task');

      const inputList = document.createElement('input');
      inputList.type = 'checkbox';
      inputList.id = 'task';
      inputList.checked = this.list[i].completed;
      listElement.appendChild(inputList);

      const descriptionTask = document.createElement('label');
      descriptionTask.classList.add('task-content');
      descriptionTask.contentEditable = 'true';
      descriptionTask.textContent = `${this.list[i].description}`;
      listElement.appendChild(descriptionTask);

      const buttonRemove = document.createElement('button');
      buttonRemove.classList.add('button-more');
      buttonRemove.style.display = 'none';
      listElement.appendChild(buttonRemove);

      const imageTrash = document.createElement('img');
      imageTrash.src = trashIcon;
      imageTrash.classList.add('image-button-more');
      buttonRemove.appendChild(imageTrash);
      
      descriptionTask.addEventListener('focus', () => {
        listElement.classList.add('editable-task');
        buttonTask.style.display = 'none';
        buttonRemove.style.display = 'inherit';
      });

      descriptionTask.addEventListener('blur', () => {
        listElement.classList.remove('editable-task');
        buttonRemove.style.display = 'none';
        buttonTask.style.display = 'inherit';
        if(descriptionTask.textContent == ""){
            this.removeTask(this.list[i].index);
        } else {
            this.modifiedTask(descriptionTask.textContent, this.list[i].index);
        }
        descriptionTask.contentEditable = 'true';
      });

      descriptionTask.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            descriptionTask.contentEditable = 'false';
        }
      })

      buttonRemove.addEventListener('click', () => {
        if(descriptionTask.textContent == ""){
          this.removeTask(this.list[i].index);
        }
      });

      inputList.addEventListener('click', () => {
        if (inputList.checked) {
          descriptionTask.classList.add('hoverline');
          this.list[i].completed = true;
          localStorage.setItem('localData', JSON.stringify(this.list));
        } else {
          descriptionTask.classList.remove('hoverline');
          this.list[i].completed = false;
          localStorage.setItem('localData', JSON.stringify(this.list));
        }
      });

      if (this.list[i].completed) {
        descriptionTask.classList.add('hoverline');
      }

      const buttonTask = document.createElement('button');
      buttonTask.classList.add('button-more');
      listElement.appendChild(buttonTask);

      const buttonImage = document.createElement('img');
      buttonImage.src = Icon;
      buttonImage.classList.add('image-button-more');
      buttonTask.appendChild(buttonImage);

      this.list[i].index = i + 1;

      this.container.appendChild(listElement);
    }

    localStorage.setItem('localData', JSON.stringify(this.list));
  }

}
