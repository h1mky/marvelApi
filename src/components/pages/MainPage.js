import { useState } from "react";
import { Helmet } from "react-helmet";

import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";
import CharSearchForm from "../CharSearchForm/CharSearchForm";

const MainPage = () => {
  const [SelectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList
            onCharSelected={onCharSelected}
            charSelected={SelectedChar}
          />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={SelectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};
export default MainPage;
