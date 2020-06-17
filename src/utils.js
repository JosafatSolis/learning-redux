// Funciones para pasar de Arreglo <--> Objeto de objetos con llaves
export const normalizeData = (data) => 
data.reduce((acc, todo) => ({...acc, [todo.id]: todo }), {});
/* 
// Se genera una estructura como esta, donde cada par llave-valor es una propiedad con su id y el objeto que representa, para poder acceder
// al objeto con results.id
results: {
        1: {
          id: 1,
          title: "Una tarea pendiente",
          body: "Hacer algo que está pendiente lo antes posible",
        },
      },
*/

// Regresa el objeto a un array con los objetos originales:
export const denormalizeData = (data) => Object.values(data);
