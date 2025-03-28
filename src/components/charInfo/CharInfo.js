import { useState, useEffect } from "react";

import ErrorMessage from "../erorrMessage/ErorrMessage";
import Spinner from "../spinner/Spinner";

import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, getAllComics } = useMarvelService();

  useEffect(() => {
    console.log(getAllComics());
    updateChar();
    console.log("akame ga kill");
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);

    console.log(char);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const isImageNotAvailable = thumbnail.includes("image_not_available");
  console.log(comics);

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={{ objectFit: isImageNotAvailable ? "contain" : "cover" }}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {!comics || comics.length === 0 ? (
          <p>No comics with this character.</p>
        ) : (
          comics.slice(0, 10).map((item, i) => (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          ))
        )}
      </ul>
    </>
  );
};
export default CharInfo;
