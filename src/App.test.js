// Para testear componentes (JSX) hay que importar React (tenerlo en contexto)
import React from 'react';
// Después se importan el componente que se va a testear:
import App from './App';
// Se importa el render "Optimizado"
import { renderWithProvider } from "./jest/utils";
// redux-mock-store se instala sólo para desarrollo y eso se ve en el package.json: --dev
import createStore from "redux-mock-store";
import thunk from "redux-thunk";

// Para probar usando Thunk
const mockStore = createStore([thunk]);

test('renders learn react link', () => {
  // Se requiere un store
  const store = mockStore({ todos: {results: {} } });
  // render regresa una lista de métodos que se pueden utilizar para testear
  const { getByText, debug } = renderWithProvider(<App />, { store });
  // Se tiene un DOM virtual, el cual se puede mostrar con el método debug()
  debug();
  // La siguiente estructura es una estructura regular que dice que coincida con ese estring (aunqe sea parcial, sin importar mayúsculas y minúsculas[i])
  const title = getByText(/deivid/i);
  // Aquí vienen todas las aseveraciones que se pueden probar: https://github.com/testing-library/jest-dom
  expect(title).toBeInTheDocument();



});
