import { ADD_ONE, MINUS_ONE } from "./actions";

// Define cómo será la data en el STORE
const initialState = {
  counter: 0,
};

// Si no llega un state, se utiliza el initialState
// El action.type indica qué está pasando en la aplicación
// Clásicamente si no coinicide con ninguno, regresa el estado sin cambios.
export default function reducer_copy(state = initialState, action) {
  switch (action.type) {
    case ADD_ONE:
      return {counter: state.counter + 1};

    case MINUS_ONE:
      return {counter: state.counter - 1};

    default:
      return state;
  }
}
