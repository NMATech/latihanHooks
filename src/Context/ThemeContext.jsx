import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    dark: {
      bg: "#333",
      text: "#fff",
    },
    light: {
      bg: "#fff",
      text: "#333",
    },
  };

  function changeTheme() {
    setIsDark((isDark) => !isDark);
  }

  return (
    <ThemeContext.Provider value={{ isDark, changeTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
