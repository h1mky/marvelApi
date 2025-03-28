import { useState } from "react";

import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [SelectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
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
        <ErrorBoundary>
          <CharInfo charId={SelectedChar} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};
export default MainPage;
