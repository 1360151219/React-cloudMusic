import { RouteObject, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
const Home = lazy(() => import("../pages/Home/Home"))
const Rank = lazy(() => import("../pages/Rank/Rank"))
const Singers = lazy(() => import("../pages/Singers/Singers"))
const Singer = lazy(() => import("../pages/Singer/Singer"))
const Recommend = lazy(() => import("../pages/Recommend/Recommend"))
const Album = lazy(() => import("../pages/Album/Album"))
const Search = lazy(() => import("../pages/Search/Search"))

const suspenseComponent = (Component: React.LazyExoticComponent<any>) => {
    return (
        <Suspense fallback={null}>
            <Component />
        </Suspense>
    )
}
const router: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/recommend"></Navigate>
    },
    {
        path: '/',
        element: suspenseComponent(Home),
        children: [
            {
                path: '',
                element: <Navigate to='/recommend'></Navigate>
            },
            {
                path: "/recommend",
                element: suspenseComponent(Recommend),
                children: [
                    {
                        path: '/recommend/:id',
                        element: suspenseComponent(Album),
                    }
                ]
            },
            {
                path: "/singers",
                element: suspenseComponent(Singers),
                children: [
                    {
                        path: '/singers/:id',
                        element: suspenseComponent(Singer),
                    }
                ]
            },
            // {
            //     path: "/rank",
            //     element: suspenseComponent(Rank),
            //     children: [
            //         {
            //             path: "/rank/:id",
            //             element: suspenseComponent(Album),
            //         }
            //     ]
            // },
            // {
            //     path: "/search",
            //     element: suspenseComponent(Search),
            // },
            // {
            //     path: "/album/:id",
            //     element: suspenseComponent(Album),
            // }
        ]
    },
]
export default router