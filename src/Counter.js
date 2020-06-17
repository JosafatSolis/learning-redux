import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease, ADD_ONE } from "./redux/actions";

// El useSelector está rastreando los cambios en el estado

const Counter = () => {
    const count = useSelector(state => {
        // Al hacer el combine reducer se agreg un nivel, pero se puede modificar el initial state
        return state.counter;
    });

    // EN LA VISTA SE DETONAN LAS ACCIONES
    // Es decir, aquí se DESPACHA LA ACCIÓN
    // La 

    const dispatch = useDispatch();
    // Se despacha un OBJETO, y se podría hacer directamente, ambas son válidas
    return (
        <div>
            <h1>{count}</h1>
            <div>
                <button onClick={() => dispatch(decrease())} >-</button>
                <button onClick={() => dispatch({ type: ADD_ONE })} >+</button>
            </div>
        </div>
    )
}

export default Counter;