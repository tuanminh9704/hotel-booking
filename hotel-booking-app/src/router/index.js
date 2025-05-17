import LayoutDefault from '../layoutDefault/layoutDefault';
// import BookRoom from "../pages/BookRoom";
import CreateRoom from '../pages/CreateRoom';
import Dashboard from "../pages/Dashboard"; // Đã sửa lỗi chính tả
import Detail from '../pages/Detail';
import Discover from '../pages/Discover';
import Home from '../pages/Home';
import ListRoom from '../pages/ListRoom';
import LoginPage from '../pages/Login';
import Payment from '../pages/Payment';

export const router = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "payment",
        element: <Payment/>
    },
    {
        path: "discover",
        element: <Discover />,
        children: [
            {
                path: "detail/:id",
                element: <Detail />
            },
        ]
    },
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "/admin",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "create-room",
                element: <CreateRoom />
            },
            {
                path: "list-room",
                element: <ListRoom />
            }
        ]
    }
];
