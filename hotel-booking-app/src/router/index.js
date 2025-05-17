import { elements } from 'chart.js';
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
import PrivateRouters from '../components/PrivateRouters';

export const router = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "payment",
        element: <Payment />
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
        element: <PrivateRouters />,
        children: [
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
            },
        ]
    },
    {
        path: "/*",
        elements: <><h1>Trang không tồn tại</h1></>,
    }
];
