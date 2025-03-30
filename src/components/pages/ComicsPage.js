import { Helmet } from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of our comics" />
        <title>Comics page</title>
      </Helmet>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList
        //   selectedComics={selectedComics}
        //   onComicsSelected={onComicsSelected}
        />
      </ErrorBoundary>
    </>
  );
};
export default ComicsPage;
