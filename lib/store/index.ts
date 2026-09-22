import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/store/animi/auth-slice";
import { animiApi } from "@/lib/store/api/animi";

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            auth: authReducer,
            [animiApi.reducerPath]: animiApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(animiApi.middleware),
    });

    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
