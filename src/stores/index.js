import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "../pages/Recommend/store/index";
export default configureStore({
    reducer: {
        recommend: recommendReducer
    },
});