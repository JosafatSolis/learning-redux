// Cualquier librería se puede fakear
// Se fakean los métodos que tiene la librería de axios, cuando se llame a la función, se va a ejecutar la función fn
export default {
    get: jest.fn(() => Promise.resolve({ data: {} }))
};