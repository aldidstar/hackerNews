import React from "react";
import CardContent from "../CardContent/CardContent";

const Article = (props) => {
  return (
    <article>
      <CardContent {...props} />
      {props.text && <p dangerouslySetInnerHTML={{ __html: props.text }} />}
      {props.url && (
        <p>
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            Read Source
          </a>
        </p>
      )}
    </article>
  );
};

export default Article;
