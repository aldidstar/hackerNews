import React from "react";
import Header from "../components/Header/Header";
import NewsList from "../components/NewsList/NewsList";


const HomePage = () => {
    return (
        <React.Fragment>
            <Header />
            <main>
               <NewsList />
            </main>
        </React.Fragment>
    );
};

export default HomePage;
