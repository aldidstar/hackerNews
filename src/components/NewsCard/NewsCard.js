import React from "react";
import { Link } from "react-router-dom";

import styles from "./NewsCard.module.css";
import CardContent from "../CardContent/CardContent";

const NewsCard = (props) => {
    return (
        <li className={styles.card}>
            <Link to={`/article/${props.id}`}>
                <article>
                    <CardContent {...props} />
                </article>
            </Link>
        </li>
    );
};

export default NewsCard;
