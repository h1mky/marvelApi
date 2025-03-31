import { useEffect, useState } from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelService from "../../services/MarvelService";

import SetContent from "../../utils/SetContent";

const RandomChar = () => {
  const [char, stateChar] = useState({});

  const { loading, error, getCharacter, process, setProcess } =
    useMarvelService();

  const onCharLoaded = (char) => {
    stateChar(char);
    console.log(char);
  };

  useEffect(() => {
    updateChar();
  }, []);

  const updateChar = () => {
    const id = Math.floor(Math.random() * (20 - 1) + 1);

    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  if (loading) {
  }

  return (
    <div className="randomchar">
      {SetContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki } = data;
  const isImageNotAvailable = thumbnail
    ? thumbnail.includes("image_not_available")
    : false;
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={{ objectFit: isImageNotAvailable ? "contain" : "cover" }}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
