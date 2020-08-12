import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer, { getTodos, loadingTodos, getTodosSuccess, getTodosError } from "../TodosDucks";
// En el ambiente de pruebas, cada que importamos una librería, se obtiene de __mocks__
import mockAxios from "axios";

const mockStore = createMockStore([thunk]);

// Hay 2 casos posibles (2 caminos posibles), se prueba cada uno

describe("Todos actions creators", () => {
    it("should handle success actions", async () => {
        // .mockImplementationOnce sobreescribe la funcionalidad por defecto de la librería fake:
        mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: [{ id: 1, title: "test title", body: "test body"}] }));
        // Redux-mock-store también puede mockear el dispatch
        const store = mockStore();
        // Se despacha el método principal que queremos probar (el thunk)
        await store.dispatch(getTodos());
        // Se obtienen todas las acciones que se hayan despachado en el proceso
        const actions = store.getActions();
        // Se queda colgada la prueba porque nunca tiene acceso a la api, se tiene que fakear axios
        // actions regresa 1 elemento porque nos gana la sincronicidad y no ha terminado cuando se ejecuta
        // console.log(actions);
        // Si no hay un expec, el test es exitoso por default
        // Hack, copiar lo que se muestra en los tests
        const expectedActions = [
            { type: 'irontodos/todos/LOADING' },
            { type: 'irontodos/todos/GET_TODOS_SUCCESS', payload: [ { id: 1, title: "test title", body: "test body"} ] }
        ];
        // expectedActions se tiene que hacer más esctrica la compleja, las actions y expectedActions son iguales de forma superficial,
        // para estar seguros de que son exactamente iguales
        expect(actions).toStrictEqual(expectedActions);
    });

    it("should handle error action", async () => {
        // Recordar que las promesas tienen 2 posibles resultados, estamos probando el erróneo
        mockAxios.get.mockImplementationOnce(() => Promise.reject({ response: { data: { data: {error: "algo salio mal"} } }}));
        const store = mockStore();
        await store.dispatch(getTodos());
        const actions = store.getActions();
        // console.log(actions);
        const expectedActions = [
            { type: 'irontodos/todos/LOADING' },
            {
                type: 'irontodos/todos/GET_TODOS_ERROR',
                error: { data: {error: "algo salio mal"} }
            }
        ];
        expect(actions).toStrictEqual(expectedActions);
    });
});

const buildState = (changes) => ({
    loading: false,
    results: {},
    error: undefined,
    ...changes
});

describe("todos reducer", () => {
    it("should return initial state if no action", () => {
        // Se pasa undefined en el primer parámetro para que tome el valor por defecto
        const state = reducer(undefined, {});
        expect(state).toStrictEqual(buildState());
    });

    it("shuld handle loading actions", () => {
        const action = loadingTodos();
        const state = reducer(undefined, action);
        expect(state).toStrictEqual(buildState({ loading: true }));
    });

    it("should handle getTodosSuccess actions", () => {
        const action = getTodosSuccess([{ id: 1, title: "title", body: "body"}]);
        const state = reducer(undefined, action);
        expect(state).toStrictEqual(
            buildState({ results: { 1: { id: 1, title: "title", body: "body"}}})
        )
    });

    it("should handle getTodosError action", () => {
        const action = getTodosError("algo salio mal");
        const state = reducer(undefined, action);
        console.log(state);
        expect(state).toStrictEqual(
            buildState({error: "algo salio mal"})
        )
    });

});