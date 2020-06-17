import React from "react";
import Counter from "./Counter";
import TodoList from "./TodoList";
import "./App.css";

function App() {
  /*
  // La ruta state.TODOS.results es porque se están usando DOS REDUCERS
  const todos = useSelector((state) => state.todos.results);
  const loadingTodos = useSelector((state) => state.todos.loading);
  const dispatch = useDispatch();

  // Se agrega el dispatch en el arreglo porque si no genera un warning...
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
*/

// Para testear, App aunque no se utiliza Redux directamente en App, pero como contiene elementos que sí lo utilizan, debe tener capacidad de tenerlo
// en los tests.

  return (
    <div className="App">
      <h1>Deivid TODOS</h1>
      <div>
        <Counter />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
