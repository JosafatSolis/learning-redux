// Loa actions son objetos

// Action Types, son simplemente la lista de acciones
export const ADD_ONE = "ADD_ONE";
export const MINUS_ONE = "MINUS_ONE";

// Action Creators, devuelven la información adicional que necesitan las acciones
export const increase = () => ({
    type: ADD_ONE,
});

export const decrease = () => ({
    type: MINUS_ONE,
});