import React from "react";
import styles from "./CommentList.module.css";
import Comment from "../Comment/Comment";

const CommentsList = ({ comments }) => {
    return (
        <React.Fragment>
            <ul className={styles.commentThread}>
                {comments.map((comment) => (
                    <li key={comment.id} className={styles.comment}>
                        <Comment item={comment} />
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
};

export default CommentsList;
