import React from "react";
import TodoList from "../TodoList";
import { renderWithProvider } from "../jest/utils";
import createStore from "redux-mock-store";
import thunk from "redux-thunk";
import { screen } from "@testing-library/react";

const mockStore = createStore([thunk]);

const buildState = (changes) => ({
  todos: {
    results: {},
    loading: false,
    ...changes
  }
});


describe("TodoLists Component", () => {
  // El estado que utiliza este componente, lo espera dentro del objeto "todos", porque el combineReducers lo pone allí
  // const initialState = {
  //   todos: {
  //     loading: false,
  //     results: {
  //       1: {
  //         id: 1,
  //         title: "Una tarea pendiente",
  //         body: "Hacer algo que está pendiente lo antes posible",
  //       },
  //     },
  //     error: undefined,
  //   }
  // };
  
 

  it("should render", () => {
    const initialState = buildState();
     const store = mockStore(initialState);
    const {debug} = renderWithProvider(<TodoList />, { store });
    debug();
    expect(screen.getByRole("heading", { name: "Todo List" })).toBeInTheDocument();
  });

  it("should render loaders", () => {
    const initState = buildState({ loading: true });
    const store = mockStore(initState);
    renderWithProvider(<TodoList />, {store})
    expect(
      screen.getByRole("heading", { name: /cargando/gi })
    ).toBeInTheDocument();
  })

  it("should render first todo", () => {
    const initState = buildState( {
      results: {
              1: {
                id: 1,
                title: "Una tarea pendiente",
                body: "Hacer algo que está pendiente lo antes posible",
              },
            }
          }
    );
    const store = mockStore(initState);
    // Ver para qué sive el screen
    const { getElementByRole, debug } = renderWithProvider(<TodoList />, { store });
    screen.debug();
    expect(screen.getAllByRole("listitem").length).toBe(1);
  });
});
