import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const ACTIONS = {
  TODO_ADD: "todo-add",
  TODO_TOGGLE: "todo-toggle",
  TODO_DELETE: "todo-delete",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.TODO_ADD:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TODO_TOGGLE:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    case ACTIONS.TODO_DELETE:
      return todos.filter((todo) => todo.id !== action.payload.id);
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

const Todo = () => {
  const { isDark, changeTheme, theme } = useContext(ThemeContext);
  const [todo, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");
  const inputRef = useRef();

  const style = isDark
    ? {
        backgroundColor: theme.dark.bg,
        color: theme.dark.text,
      }
    : {
        backgroundColor: theme.light.bg,
        color: theme.light.text,
      };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.TODO_ADD, payload: { name: name } });
    setName("");
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={style}>
      <h1>TEST</h1>
      <button onClick={changeTheme}>Change theme</button>

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={name}
          placeholder="add todo"
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      {todo.map((todo) => {
        return (
          <>
            <h3 style={{ color: todo.complete ? "green" : "red" }}>
              {todo.name}
            </h3>
            <button
              onClick={() =>
                dispatch({
                  type: ACTIONS.TODO_TOGGLE,
                  payload: { id: todo.id },
                })
              }
            >
              Check
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: ACTIONS.TODO_DELETE,
                  payload: { id: todo.id },
                })
              }
            >
              Delete
            </button>
          </>
        );
      })}
    </div>
  );
};

export default Todo;
