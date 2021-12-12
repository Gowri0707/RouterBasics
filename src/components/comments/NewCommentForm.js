import { useRef } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from "../../hooks/use-http";
import Card from '../UI/Card';
import quotesClasses from '../quotes/QuoteForm.module.css';
import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const {sendRequest, isLoading, error} = useHttp();
  const commentTextRef = useRef();
  // const navigate = useNavigate();

  const onAddComment = (comments) => {
    props.onAddComment(comments, commentTextRef.current.value);
  }

  const submitFormHandler = (event) => {
    event.preventDefault();

    sendRequest({
      URL: 'https://quotes-adbfd-default-rtdb.firebaseio.com/comments.json',
      method: 'POST',
      data: {
        text: commentTextRef.current.value,
        quoteId: props.quoteId
      }
    }, onAddComment)

    // optional: Could validate here

    // send comment to server
  };

  return (
    <Card>
      {
        isLoading && <div className={quotesClasses.loading}>
        <LoadingSpinner />
      </div>
      }
    
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      {error && <h1>Failed to save comments</h1>}
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
    </Card>
  );
};

export default NewCommentForm;
