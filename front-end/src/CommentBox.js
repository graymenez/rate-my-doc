import React, { useEffect, useState } from "react";
import RmdApi from "./api";
import StarRating from "./StarRating";

const CommentBox = ({ comment, commentFor }) => {
  // renders the rating users, name, star count, points out of five and the review comment left by a particular user

  return (
    <>
      {comment.review.length === 0 ? null : (
        <div className="comment-container">
          <div className="user-info">
            <h3 className="user-name">{comment.username}</h3>
            <div className="comment-stars">
              <StarRating starCount={comment.rating} />
            </div>
            <p className="comment-rating">{comment.rating}/5</p>
          </div>
          <div className="rating-info">
            <p className="comment-review">{comment.review}</p>
          </div>
        </div>
      )}
    </>
  );
};
export default CommentBox;
