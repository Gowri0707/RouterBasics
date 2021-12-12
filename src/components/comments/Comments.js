import { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import quotesClasses from '../quotes/QuoteForm.module.css';
import useHttp from "../../hooks/use-http";
import CommentsList from './CommentsList';

const Comments = () => {
  const params = useParams();
  const {sendRequest, error, isLoading} = useHttp();
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const {quoteId} = params;

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const onAddComment = (comments, text) => {
    setComments(prevComments => {
     return [...prevComments, {id: comments.id, text: text}];
    })
  }

  const fetchComments = useCallback((comments) => {
    // console.log('fetchedQuotes' ,quotes);
    const commentsData = [];
    for (const key in comments) {
      if(comments[key].quoteId === quoteId) {
        commentsData.push({
          id: key,
          quoteId: comments[key].quoteId,
          text: comments[key].text
        });
      }
    }
    setComments(commentsData);
  }, [quoteId]);
  console.log('comments', comments);

  useEffect(() => {
    sendRequest({
      URL: 'https://quotes-adbfd-default-rtdb.firebaseio.com/comments.json',
      method: 'GET'
    }, fetchComments)
  }, [sendRequest, fetchComments]);
  let commentsJsx;
  
  if(isLoading) {
    commentsJsx =  <div className={quotesClasses.loading}>
      <LoadingSpinner />
    </div>
  }

  if(error) {
    commentsJsx = <div><h1>Failed to fetch Comments.Please try again!</h1></div>;
  }

  if(!isLoading && comments.length <= 0) {
    commentsJsx = <div>Comment is empty right now, please add a comment</div>
  }

  if(!isLoading && comments.length > 0) {
    commentsJsx = <CommentsList comments={comments} />
  }


  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={onAddComment} quoteId={params.quoteId}/>}
      {commentsJsx}
    </section>
  );
};

export default Comments;
