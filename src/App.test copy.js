// Para testear componentes (JSX) hay que importar React (tenerlo en contexto)
import React from 'react';
// render emula el montaje del componente
import { render } from '@testing-library/react';
// Después se importan el componente que se va a testear:
import App from './App';
// Si el componente a probar está dentro de un Provider, se tiene que agegar también un provider en las pruebas, incluyendo el store
import { Provider } from 'react-redux';
import { rootReducer } from './redux/store';
// Se importa para poder crear el Store aquí
import { createStore } from 'redux';

// Por default, se testea la pantalla de Inicio que se dibuja en el proyecto original
// TestId es un atributo que se agrega cuando ninguno de los otros elementos funciona.
// https://testing-library.com/docs/dom-testing-library/cheatsheet

// Se testea:
// 1. Que el componente se dibuje

test('renders learn react link', () => {
  // Se requiere un store
  const store = createStore(rootReducer);
  // render regresa una lista de métodos que se pueden utilizar para testear
  const { getByText, debug } = render(
  <Provider store={store}>
    <App />  
  </Provider>
);
  // Se tiene un DOM virtual, el cual se puede mostrar con el método debug()
  debug();
  // La siguiente estructura es una estructura regular que dice que coincida con ese estring (aunqe sea parcial, sin importar mayúsculas y minúsculas[i])
  const title = getByText(/deivid/i);
  // Aquí vienen todas las aseveraciones que se pueden probar: https://github.com/testing-library/jest-dom
  expect(title).toBeInTheDocument();
});
