import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "../pages/Recommend/store/index";
import albumReducer from "../pages/Album/store/index"
import singersReducer from "../pages/Singers/store";
import rankReducer from "../pages/Rank/store";
import searchReducer from "../pages/Search/store";
import playerReducer from "../pages/Player/store";
import singerReducer from "../pages/Singer/store";
export default configureStore({
    reducer: {
        recommend: recommendReducer,
        album: albumReducer,
        singers: singersReducer,
        singer: singerReducer,
        rank: rankReducer,
        search: searchReducer,
        player: playerReducer,
    },
});