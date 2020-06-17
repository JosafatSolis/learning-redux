import axios from "axios";
import { normalizeData } from "../utils";

// Action Types
const LOADING = "irontodos/todos/LOADING" // Acción genérica que indica que se ejecutó una acción de solicitar información

const GET_TODOS_SUCCESS = "irontodos/todos/GET_TODOS_SUCCESS"; // Indica que se ejecutó la acción de solicitar la información de forma exitosa, para agregar las TODOS al State y quitar el loader
const GET_TODOS_ERROR = "irontodos/todos/GET_TODOS_ERROR"; // Para mostrar el error

const CREATE_TODO = "irontodos/todos/CREATE_TODO";

// results tiene el objeto inicial, puede ser un objeto vacío, un arreglo vacío, undefined, ... etc.
// Initial State
const initialState = {
    loading: false,
    results: {},
    error: undefined
};



// Siempre se exporta por default la función "reducer"
// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {...state, loading: true}

        case GET_TODOS_SUCCESS:
            return {...state, results: normalizeData(action.payload), loading: false};

        case GET_TODOS_ERROR:
            return {...state, error: action.error, results: {}, loading: false};

        case CREATE_TODO:
            return {...state, results: [...state.results, action.payload] };
    
        default:
            return state;
    }
};

// Action Creators
export const loadingTodos = () => ({
    type: LOADING
});

export const getTodosSuccess = (payload) => ({
    type: GET_TODOS_SUCCESS,
    payload
});

export const getTodosError = (error) => ({
    type: GET_TODOS_ERROR,
    error
});

export const createTodo = (payload) => ({
    type: CREATE_TODO,
    payload
});

// Mientras un Action Creator regresa un objeto, un Thunk va a regresar una función (una función que regresa una función)
// Desde fuera se hace referencia y "dispara" ejecutando una función que
// al ejecutarse regresa otra función con la firma insertando un (dispatch)

// thunk
export const getTodos = () => {
    return (dispatch) => {
        // Habilita el loading
        dispatch(loadingTodos());
        // Comienza la carga y ejecuta acción al terminar
        axios.get("http://localhost:4000/todos").then((res) => {
            dispatch(getTodosSuccess(res.data));
        }).catch(res => {
            // Axios regresa el error en res.response.data y queremos el mensaje para el usuario
            dispatch(getTodosError(res.data));
        });
    }
}