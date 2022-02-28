import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "moment/locale/fr";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./providers/AuthProvider";
import { theme } from "./styles/theme";
import "swiper/css";
import "swiper/css/pagination";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
