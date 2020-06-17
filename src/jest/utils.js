// Aquí vamos a crear nuestro propio método de render, con el provider
import React from "react";
// Viene dentro de node_modules, es un render "fake" que contiene la funcionalidad para testear, regresa funciones como getByRole, debug, ...:
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "../redux/store";
import { createStore } from "redux";

// Si no se recibe un store, se crea uno muy simple (sin Thunk) sólo para procesos síncronos
// renderOptions le da más posibilidades al render (de arriba), con nuevos parámetros
export const renderWithProvider = (
  component,
  { store = createStore(rootReducer), ...renderOptions } = {}
) => {
  return render(
    <Provider store={store}>{component}</Provider>,
    { ...renderOptions }
  );
};
