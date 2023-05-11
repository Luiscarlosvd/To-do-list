export default class taskList {
  constructor() {
    this.list = [];
  }

  addTask(task) {
    this.list.push(task);
    localStorage.setItem('localData', JSON.stringify(this.list));
  }

  modifiedTask(newDescription, index) {
    this.list.forEach((task) => {
      if (task.index === index) {
        task.description = newDescription;
      }
    });
    localStorage.setItem('localData', JSON.stringify(this.list));
  }

  removeTask(index) {
    this.list = this.list.filter((task) => task.index !== index);
    localStorage.setItem('localData', JSON.stringify(this.list));
  }

  completedTask(index) {
    this.list.forEach((task) => {
      if (task.index === index && task.completed === false) {
        task.completed = true;
      } else if (task.index === index && task.completed) {
        task.completed = false;
      }
    });
    localStorage.setItem('localData', JSON.stringify(this.list));
  }

  clearCompletedTask() {
    this.list = JSON.parse(localStorage.getItem('localData'));
    this.list = this.list.filter((task) => task.completed === false);
    localStorage.setItem('localData', JSON.stringify(this.list));
  }
}
