import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Loading from "./components/Loading/Loading";
import { fetchNews } from "./store/fetchEverything";

const MainPage = React.lazy(() => import("./pages/HomePage"));
const CommentPage = React.lazy(() => import("./pages/CommentPage/CommentPage"));


let flag = true;

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (flag) {
            dispatch(fetchNews());
            flag = false;
        }
    }, [dispatch]);

    useEffect(() => {
        fetchNews();
        const interval = setInterval(() =>{
            dispatch(fetchNews());
        }, 60000);
        return () => clearInterval(interval);
    }, [dispatch])

    return (
        <React.Fragment>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route exact path="/" element={<MainPage />} />
                    <Route exact path="/article/:id" element={<CommentPage />} />
                </Routes>
            </Suspense>
        </React.Fragment>
    );
}

export default App;
