import { useReducer, useState } from "react";
import { ThemeProvider } from "./Context/ThemeContext";
import Todo from "./Component/Todo";

function App() {
  return (
    <main>
      <ThemeProvider>
        <Todo />
      </ThemeProvider>
    </main>
  );
}

export default App;
