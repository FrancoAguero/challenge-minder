import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import TodoListLayout from "./pages/TodoList/ui/layout/TodoListLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./app/helpers/queryClient";

const theme = createTheme();

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
          <TodoListLayout />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
