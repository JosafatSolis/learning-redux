import React from "react";
import TodoList from "../TodoList";
import { renderWithProvider } from "../jest/utils";
import createStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = createStore([thunk]);

describe("TodoLists Component", () => {
  // El estado que utiliza este componente, lo espera dentro del objeto "todos", porque el combineReducers lo pone allí
  const store = mockStore({
    todos: {
      loading: false,
      results: {
        1: {
          id: 1,
          title: "Una tarea pendiente",
          body: "Hacer algo que está pendiente lo antes posible",
        },
      },
      error: undefined,
    },
  });
  it("should render first todo", () => {
    const { getElementByRole, debug } = renderWithProvider(<TodoList />, {
      store,
    });
    debug();
  });
});
