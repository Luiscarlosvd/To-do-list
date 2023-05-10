import taskList from "./tasklistTest";

// Mocking localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => {
      return store[key] || null;
    },
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
    //Arrange
    const list = new taskList();
    const task = {
        description: "Clean my bedroom", 
        completed: false,
        index: 1
        }
  
    //Act
    list.addTask(task);
  
    //Assert
    expect(list.list).toContain(task);

    
  });

  test('deletes an object from the tasklist with a given index', () => {
    //Arrange
    const list = new taskList();
    const task = {
        description: "take out the clothes", 
        completed: false,
        index: 1
        }
  
    //Act
    list.addTask(task);
    list.removeTask(1);
  
    //Assert
    expect(list.list).not.toContain(task);

    
  });  
});