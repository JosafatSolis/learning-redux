import React from "react";
import Counter from "../Counter";
// Como el componente utiliza Redux, se utiliza el Provider
import { renderWithProvider } from "../jest/utils";
import { fireEvent } from "@testing-library/react";
// Para emular eventos, hay dos librerías, una básica y una completa. Esta es la básica

// https://testing-library.com/docs/dom-testing-library/cheatsheet
// https://github.com/testing-library/jest-dom

// Errores comunes al usar la librería de Testing:
// https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

// Solo al estar dentro de la carpeta __tests__ ya se ejecuta en las pruebas

// Describir qué se está testeando, no es estrictamente necesario, sólo es para agrupar las pruebas
describe("Counter Component", () => {
    // test vs it es lo mismo funcionalmente. Se utiliza test para hacer un sólo test. Para una bateria de pruebas, se utiliza el it
    it("should render", () => {
        // No se utiliza store para que utilice el por defecto, sólo se está validando el render
        // Cada etiqueta HTML tiene un propósito, para eso se utiliza el ..byRole
        const { getByRole } = renderWithProvider(<Counter />);
        // El role de un h1 es ser un encabezado
        expect(getByRole("heading")).toBeInTheDocument();
    });
    // Testear que cuando se de clic en + se incremente, tenemos que emular el clic
    it("shoudl increment count [dispatch increment action]", () => {
        // Normalmente se tienen 3 partes, la configuración (preparación de info previa requerida), ejecución y aseveración
        const { getByRole, debug } = renderWithProvider(<Counter />);
        // Cuando no sabemos qué roles existen, se pone uno que no existe, para que indique qué roles hay disponibles
        // Se escoge el que tiene un name particular, name normalmente representa el contenido del objeto*
        // También se le puede asignar un atributo role="xx" al elemento html, y usar en las pruebas
        // También se puede utilizar un TestId, de la siguiente forma:  data-testid="ssss"
        // const container = getByTestId(ssss)
        // Sólo se debe utilizar cuando no pueda seleccionarlo por ninguno de los otros métodos, o si es dinámico objeto
        const incrementButton = getByRole("button", {name: "+"});
        // Se emula el clic
        fireEvent.click(incrementButton);
        // Opcional, para dibujar el DOM actualizado y ver lo que se tiene
        debug();
        // Se busca en h1 y que sea el 1, se hace un hack
        expect(getByRole("heading", { name: "1" })).toBeInTheDocument();
    });

    // Hacer el que decrementa a -1
    it("should decrement count", () => {
        // Se selecciona el componente con el que va a trabajar y los métodos que se van a utilizar
        const { getByRole } = renderWithProvider(<Counter />);
        // Se selecciona el elemento HTML con el que se va a trabajar
        const decrementButton = getByRole("button", {name: "-"});
        // Se emula el clic, como el estado se reinicial en el renderWithProvider, se espera -1
        fireEvent.click(decrementButton);
        // Para ver si fue exitosa la prueba, busca el -1 en donde va (heading)
        expect(getByRole("heading", {name: "-1"})).toBeInTheDocument();
    });
})