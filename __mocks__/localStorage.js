const localStorage = {
    getItem: function (key) {
      return localStorageMock[key] || null;
    },
    setItem: function (key, value) {
      localStorageMock[key] = value.toString();
    },
    removeItem: function (key) {
      delete localStorageMock[key];
    },
    clear: function () {
      Object.keys(fakeLocalStorage).forEach(
        (key) => delete localStorageMock[key]
      );
    },
  };
  
  export const localStorageMock = Object.create(storagePrototype);
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});