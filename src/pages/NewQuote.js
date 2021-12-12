import { useNavigate } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
    const navigate = useNavigate();
    const addQuoteHandler = (quotes) => {
        console.log("received new quote is ---->", quotes);
        navigate('/quotes')
    }
    return (
        <QuoteForm onAddQuote={addQuoteHandler}/>
    )
}

export default NewQuote;