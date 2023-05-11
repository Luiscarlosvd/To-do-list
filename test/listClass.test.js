import TaskList from './tasklistTest.js';

// Mocking localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
global.localStorage = localStorageMock;

describe('taskList', () => {
  // Add Method
  test('pushes the given object (task) into the list array and store it in localStorage', () => {
    // Arrange
    const list = new TaskList();
    const task = {
      description: 'Clean my bedroom',
      completed: false,
      index: 1,
    };

    // Act
    list.addTask(task);

    // Assert
    expect(list.list).toContain(task);
  });

  // remove method
  test('deletes an object from the tasklist with a given index', () => {
    // Arrange
    const list = new TaskList();
    const task = {
      description: 'take out the clothes',
      completed: false,
      index: 1,
    };
    const task2 = {
      description: 'wash my car',
      completed: false,
      index: 2,
    };
    list.addTask(task);
    list.addTask(task2);

    // Act
    list.removeTask(1);

    // Assert
    expect(list.list).not.toContain(task);
  });

  // Clear Completed Task
  test('returns filtered tasklist with all objects that were not completed', () => {
    // Arrange
    const list = new TaskList();
    const task = {
      description: 'Clean my bedroom',
      completed: false,
      index: 1,
    };
    const task2 = {
      description: 'Wash the dishes',
      completed: true,
      index: 2,
    };
    const task3 = {
      description: 'Play videogames',
      completed: false,
      index: 3,
    };
    const task4 = {
      description: 'Seek whales',
      completed: true,
      index: 4,
    };
    list.addTask(task);
    list.addTask(task2);
    list.addTask(task3);
    list.addTask(task4);


    // Act
    list.clearCompletedTask();

    // Assert
    expect(list.list).not.toContain(task2);
    expect(list.list).not.toContain(task4);
  });
});