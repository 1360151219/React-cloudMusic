import { RouteObject, Navigate } from "react-router-dom"
import Home from "../pages/Home/Home"
import Rank from "../pages/Rank/Rank"
import Singers from "../pages/Singers/Singers"
import Singer from "../pages/Singer/Singer"
import Recommend from "../pages/Recommend/Recommend"
import Album from "../pages/Album/Album"
import Search from "../pages/Search/Search"
const router: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/recommend"></Navigate>
    },
    {
        path: '/',
        element: <Home />,
        children: [
            // {
            //     path: '',
            //     element: <Navigate to='/recommend'></Navigate>
            // },
            {
                path: "/recommend",
                element: <Recommend />,
                children: [
                    {
                        path: '/recommend/:id',
                        element: <Album />
                    }
                ]
            },
            {
                path: "/singers",
                element: <Singers />,
                children: [
                    {
                        path: '/singers/:id',
                        element: <Singer />
                    }
                ]
            },
            {
                path: "/rank",
                element: <Rank />,
                children: [
                    {
                        path: "/rank/:id",
                        element: <Album />
                    }
                ]
            },
            {
                path: "/search",
                element: <Search />,
            }
        ]
    },
]
export default router