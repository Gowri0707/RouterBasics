import { useRef, useState } from 'react';
// import { usePrompt } from "react-router-dom";

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';
import useHttp from "../../hooks/use-http";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const {sendRequest, isLoading, error} = useHttp();
  const [isFormFocused, setIsFormFocused] = useState(false);
  const textInputRef = useRef();

  const onFocusHandler = () => {
    setIsFormFocused(true);
  }

  const addButtonHandler = () => {
    setIsFormFocused(false);
    console.log("form focused", isFormFocused)
  }

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here
    sendRequest({
      URL: 'https://quotes-adbfd-default-rtdb.firebaseio.com/quotes.json',
      method: 'POST',
      data: {
        author: enteredAuthor,
        text: enteredText
      }
    }, props.onAddQuote)

    // props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }
  // usePrompt(
  //   'Are You sure want to leave this page',
  //   isFormFocused
  // )
  return (
    <>
   
    <Card>
      <form onFocus={onFocusHandler} className={classes.form} onSubmit={submitFormHandler}>
        {isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
        {
          error && (
            <div>
              Failed to save data.Please try again!
            </div>
          )
        }

        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button onClick={addButtonHandler} className='btn'>Add Quote</button>
        </div>
      </form>
    </Card>
    </>
  );
};

export default QuoteForm;
