import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { denormalizeData } from "./utils";
import { getTodos } from "./redux/TodosDucks";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.results);
  const loadingTodos = useSelector((state) => state.todos.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div>
      {loadingTodos && <h2>Cargando...</h2>}
      {!loadingTodos && todos && (
        <div>
          <h1>Todo List</h1>
          <ul>
            {denormalizeData(todos).map((todo) => (
              <li key={todo.id}>
                {todo.title}: {todo.body}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodoList;
