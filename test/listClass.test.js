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
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('taskList', () => {
    // Add Method
  test('pushes the given object (task) into the list array', () => {
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
    expect(localStorage).toContain(task);
  });    
});