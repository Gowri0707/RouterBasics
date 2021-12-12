import { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import classes from '../components/quotes/QuoteForm.module.css';
// const DUMMY_QUOTES = [
//   {
//     id: "1",
//     author: "Gowri",
//     text: "Learning Routing needs a patience",
//   },
//   { id: "2", author: "Gowri", text: "Routing is most wanted topic in React" },
// ];

const QuoteDetail = () => {
  const { sendRequest, isLoading, error } = useHttp();
  const params = useParams();
  // const location = useLocation();

  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = (quotes) => {
    // console.log('fetchedQuotes' ,quotes);
    const quotesData = [];
    for (const key in quotes) {
      quotesData.push({
        id: key,
        author: quotes[key].author,
        text: quotes[key].text,
      });
    }
    setQuotes(quotesData);
    console.log(quotesData);
  };

  useEffect(() => {
    sendRequest(
      {
        URL: `https://quotes-adbfd-default-rtdb.firebaseio.com/quotes.json`,
        method: "GET",
      },
      fetchQuotes
    );
  }, [sendRequest]);

  const quote = quotes.find((quote) => quote.id === params.quoteId);

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Failed to fetch data.Please try again!</h1>
      </div>
    );
  }

  if (!quote) {
    return <div>No quotes Found</div>;
  }

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      {/* {!location.pathname.includes("comments") && (
        <Link to={`${location.pathname}comments`}>comments</Link>
      )} */}
      <Outlet />
    </>
  );
};

export default QuoteDetail;
