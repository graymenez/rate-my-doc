import React, { useEffect, useState } from "react";
import RmdApi from "./api";
import CommentBox from "./CommentBox";

const Comments = ({ currData, commentsFor }) => {
  const [comments, setComments] = useState([]);

  // gets all comments data for a specified physician (currData) by currData.id and iterates through them to render in CommentBox component

  useEffect(() => {
    if (currData.id) {
      if (commentsFor === "physician") {
        const getComments = async () => {
          let results = await RmdApi.getPhysicianReviews(currData.id);

          setComments(results);
        };
        getComments();
      } else if (commentsFor === "hospital") {
        const getComments = async () => {
          let results = await RmdApi.getHospitalReviews(currData.id);
          setComments(results);
        };
        getComments();
      }
    }
  }, [currData]);
  let commentCount = [];
  for (let c in comments) {
    if (comments[c].review.length !== 0) {
      commentCount.push(comments[c]);
    }
  }
  return (
    <div className={comments.length ? "comments-container" : "no-comments"}>
      <h1 className="comment-count">Comments({commentCount.length})</h1>

      {comments.length ? (
        comments.map((comment) => (
          <CommentBox comment={comment} commentFor={commentsFor} />
        ))
      ) : (
        <div className="no-comments">No Comments</div>
      )}
    </div>
  );
};
export default Comments;
