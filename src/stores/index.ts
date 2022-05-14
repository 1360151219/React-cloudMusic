import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import recommendReducer from "../pages/Recommend/store/index";
import albumReducer from "../pages/Album/store/index"
import singersReducer from "../pages/Singers/store";
import rankReducer from "../pages/Rank/store";
import searchReducer from "../pages/Search/store";
import playerReducer from "../pages/Player/store";
import singerReducer from "../pages/Singer/store";
const store = configureStore({
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
export default store
// type
type RootState = ReturnType<typeof store.getState>
type Dispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<Dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector