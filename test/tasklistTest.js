export default class taskList {
  constructor() {
    this.list = [];
  }

  addTask(task) {
    this.list.push(task);
    localStorage.setItem("localData", JSON.stringify(this.list));
  }

  modifiedTask(newDescription, index) {
    this.list.forEach((task) => {
      if (task.index === index) {
        task.description = newDescription;
      }
    });
    localStorage.setItem("localData", JSON.stringify(this.list));
  }

  removeTask(index) {
    this.list = this.list.filter((task) => task.index !== index);
    localStorage.setItem("localData", JSON.stringify(this.list));
    this.render();
  }

  completedTask(index) {
    this.list.forEach((task) => {
      if (task.index === index && task.completed === false) {
        task.completed = true;
      } else if (task.index === index && task.completed) {
        task.completed = false;
      }
    });
    localStorage.setItem("localData", JSON.stringify(this.list));
    this.render();
  }

  clearCompletedTask() {
    this.list = JSON.parse(localStorage.getItem("localData"));
    this.list = this.list.filter((task) => task.completed === false);
    localStorage.setItem("localData", JSON.stringify(this.list));
  }

  render() {
    if (localStorage.getItem("localData") === null) {
      localStorage.setItem("localData", JSON.stringify([]));
    }
    this.list = JSON.parse(localStorage.getItem("localData"));
    container.innerHTML = "";
    for (let i = 0; i < this.list.length; i += 1) {
      const listElement = document.createElement("li");

      listElement.classList.add("list-task");

      const inputList = document.createElement("input");
      inputList.type = "checkbox";
      inputList.id = "task";
      inputList.checked = this.list[i].completed;
      listElement.appendChild(inputList);

      const descriptionTask = document.createElement("label");
      descriptionTask.classList.add("task-content");
      descriptionTask.contentEditable = "true";
      descriptionTask.textContent = `${this.list[i].description}`;
      listElement.appendChild(descriptionTask);

      const buttonTask = document.createElement("button");
      buttonTask.classList.add("button-more");
      listElement.appendChild(buttonTask);

      const buttonImage = document.createElement("img");
      buttonImage.src = Icon;
      buttonImage.classList.add("image-button-more");
      buttonTask.appendChild(buttonImage);

      const buttonRemove = document.createElement("button");
      buttonRemove.classList.add("button-remove");
      buttonRemove.id = "button-remove";
      buttonRemove.style.display = "none";
      listElement.appendChild(buttonRemove);

      const imageTrash = document.createElement("img");
      imageTrash.src = trashIcon;
      imageTrash.classList.add("image-button-more");
      buttonRemove.appendChild(imageTrash);

      descriptionTask.addEventListener("focus", () => {
        listElement.classList.add("editable-task");
        buttonTask.style.display = "none";
        buttonRemove.style.display = "inherit";
      });

      document.addEventListener("click", (event) => {
        const outsideClick = !listElement.contains(event.target);
        if (outsideClick) {
          listElement.classList.remove("editable-task");
          buttonRemove.style.display = "none";
          buttonTask.style.display = "inherit";
        }
      });

      buttonRemove.addEventListener("click", () => {
        this.removeTask(this.list[i].index);
      });

      descriptionTask.addEventListener("blur", () => {
        if (descriptionTask.textContent === "") {
          this.removeTask(this.list[i].index);
        } else {
          this.modifiedTask(descriptionTask.textContent, this.list[i].index);
        }
        descriptionTask.contentEditable = "true";
      });

      descriptionTask.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          descriptionTask.contentEditable = "false";
        }
      });

      inputList.addEventListener("change", () => {
        descriptionTask.classList.toggle("hoverline");
        this.completedTask(this.list[i].index);
      });

      if (this.list[i].completed) {
        descriptionTask.classList.add("hoverline");
      }

      this.list[i].index = i + 1;

      container.appendChild(listElement);
    }

    localStorage.setItem("localData", JSON.stringify(this.list));
  }
}
