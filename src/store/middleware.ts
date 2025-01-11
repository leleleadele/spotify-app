import { Middleware } from "@reduxjs/toolkit";

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    const state = store.getState();
    if (state.app?.favorites) {
      try {
        localStorage.setItem("favorites", JSON.stringify(state.app.favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage:", error);
      }
    }

    return result;
  };
