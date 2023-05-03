export default class Task {
  constructor(description, completed = false, index = 1) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}