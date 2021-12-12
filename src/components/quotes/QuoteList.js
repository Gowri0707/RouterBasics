import { Fragment, useState } from 'react';
import { useSearchParams } from "react-router-dom";

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const QuoteList = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedQuotes, setSortedQuotes] = useState(props.quotes);
  const sortParam = searchParams.get('sort');

  const sortQuotes = () => {
      if(sortParam === 'asc') {
        const quotesarr = sortedQuotes?.sort((quote1, quote2) => quote1.id > quote2.id ? -1 : 1 )
        setSortedQuotes(quotesarr)
      } else {
        const quotesarr = sortedQuotes?.sort((quote1, quote2) => quote1.id > quote2.id ? 1 : -1 )
        setSortedQuotes(quotesarr)
      }
  }

  const buttonClickHandler = () => {
    sortQuotes();
    setSearchParams({sort: sortParam === 'asc' ? 'desc' : 'asc'});
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
      <button  onClick={buttonClickHandler}>
        Sort {sortParam === 'asc' ? 'Descending' : 'Ascending'}
      </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes?.length && sortedQuotes?.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
