import { useEffect, useState } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import classes from '../components/quotes/QuoteForm.module.css';

// const DUMMY_QUOTES = [
//   {
//     id: 1,
//     author: "Gowri",
//     text: "Learning Routing needs a patience",
//   },
//   { id: "2", author: "Gowri", text: "Routing is most wanted topic in React" },
// ];

const AllQuotes = () => {
  const {sendRequest, isLoading, error} = useHttp();
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = (quotes) => {
    // console.log('fetchedQuotes' ,quotes);
    const quotesData = [];
    for (const key in quotes) {
      quotesData.push({
        id: key,
        author: quotes[key].author,
        text: quotes[key].text
      });
    }
    setQuotes(quotesData);
    console.log(quotesData);
  }

  useEffect(() => {
    sendRequest({
      URL: 'https://quotes-adbfd-default-rtdb.firebaseio.com/quotes.json',
      method: 'GET'
    }, fetchQuotes)
  }, [sendRequest]);

  if(isLoading) {
    return <div className={classes.loading}>
      <LoadingSpinner />
    </div>
  }

  if(error) {
    return <div><h1>Failed to fetch data.Please try again!</h1></div>
  }

  if(!isLoading && quotes.length === 0) {
      return <div><h1>No quotes Found</h1></div>
  }
  return <QuoteList quotes={quotes} />;
};

export default AllQuotes;
