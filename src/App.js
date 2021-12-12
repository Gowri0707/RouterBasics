import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = lazy(() => import('./pages/NewQuote'));
const AllQuotes = lazy(() => import('./pages/AllQuotes'));
const NotFound = lazy(() => import('./pages/NotFound'));
const QuoteDetail = lazy(() => import('./pages/QuoteDetail'));
const Comments = lazy(() => import('./components/comments/Comments'));


function App() {
  return (
    <Layout>
      <Suspense fallback={<div><LoadingSpinner /></div>}>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/" element={<Navigate to="/quotes/" />}></Route>
        <Route path="/quotes/" element={<AllQuotes />}></Route>
        <Route path="/quotes/:quoteId/*" element={<QuoteDetail />}>
          <Route path="" element={<Link to="comments">comments</Link>} />
          <Route path="comments" element={<Comments />}></Route>
        </Route>
        <Route path="/quotes/new" element={<NewQuote />}></Route>
      </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
