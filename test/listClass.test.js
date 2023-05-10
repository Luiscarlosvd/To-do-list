import taskList from "./tasklistTest";
jest.mock('../__mocks__/localStorage.js');

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