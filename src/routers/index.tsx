import { RouteObject, Navigate } from "react-router-dom"
import Home from "../pages/Home/Home"
import Rank from "../pages/Rank/Rank"
import Singers from "../pages/Singers/Singers"
import Recommend from "../pages/Recommend/Recommend"
const router: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
        children: [
            // {
            //     path: '',
            //     element: <Navigate to='/recommend'></Navigate>
            // },
            {
                index: true,
                element: <Recommend />
            },
            {
                path: "/singers",
                element: <Singers></Singers>
            },
            {
                path: "/rank",
                element: <Rank></Rank>
            }
        ]
    },

]
export default router