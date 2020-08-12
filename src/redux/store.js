import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import counter from "./reducer";
import todos from "./TodosDucks";

// createStore sólo recibe un reducer, se tiene que combinar si tenemos más de 1
// Se exporta para poder usarlo en los Tests
export const rootReducer = combineReducers({
    counter,
    todos
})

// El STORE monitorea de forma automáticamente los RETURNS del REDUCER (o de los REDUCERS, si son varios)

//const store = createStore(reducer);

// La siguiente línea se agrega para que el redux-devtools-extension de Chrome, para que traquee las acciones asincronas,
// como se muestra en https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))    
  );

  // Forma anterior, sólo monitoreando sincronas:
//   const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   );

export default store;