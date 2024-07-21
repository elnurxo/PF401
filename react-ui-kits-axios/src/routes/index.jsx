import Home from "../pages/Home";
import Songs from "../pages/Songs";
import AddSong from "../pages/AddSong";
import SongDetail from "../pages/SongDetail";
import NotFound from "../pages/NotFound";
import Todo from "../pages/Todo";
import MainLayout from "../components/MainLayout";


export const ROUTES = [
    {
        element: <MainLayout/>,
        path: '/',
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'songs',
                element: <Songs/>
            },
            {
                path: 'add-song',
                element: <AddSong/>
            },
            {
                path: 'songs/:id',
                element: <SongDetail/>
            },
            {
                path: 'todo',
                element: <Todo/>
            },
            {
                path: '*',
                element: <NotFound/>
            },
        ]
    }
];