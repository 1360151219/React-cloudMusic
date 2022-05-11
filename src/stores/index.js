import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "../pages/Recommend/store/index";
import albumReducer from "../pages/Album/store/index"
import singersReducer from "../pages/Singers/store";
export default configureStore({
    reducer: {
        recommend: recommendReducer,
        album: albumReducer,
        singers: singersReducer,
    },
});