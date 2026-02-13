import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApiError } from "@/lib/api";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // Global query error handler — 401s are handled by the axios interceptor
      if (error instanceof ApiError && error.status === 403) {
        console.warn("[Query] Forbidden:", error.message);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof ApiError && error.status === 403) {
        console.warn("[Mutation] Forbidden:", error.message);
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,     // 2 minutes
      gcTime: 10 * 60 * 1000,       // 10 minutes garbage-collection
      retry: (failureCount, error) => {
        // Don't retry on auth / validation errors
        if (error instanceof ApiError && [401, 403, 404, 422].includes(error.status)) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  </StrictMode>
);
