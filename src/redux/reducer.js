// El reducer es el único lugar donde se puede actualizar el estado.

import { ADD_ONE, MINUS_ONE } from "./actions";

// Define cómo será la data en el STORE, es decir EL ESTADO INICIAL
const initialState = 0;

// El switch normalmente está monitoreando qué actividad se realizará (viendo qué evento)
// El reducer siempre regresa un ESTADO, después de que se procesó la acción

// Si no llega un state, se utiliza el initialState
// El action.type indica qué está pasando en la aplicación
// Clásicamente si no coinicide con ninguno, regresa el estado sin cambios.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ONE:
      return state + 1;

    case MINUS_ONE:
      return state - 1;

    default:
      return state;
  }
}
