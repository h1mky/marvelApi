import { useParams, Link } from "react-router-dom";

import "./singleComicsPage.scss";
import { useState, useEffect } from "react";

import ErrorMessage from "../erorrMessage/ErorrMessage";
import Spinner from "../spinner/Spinner";

import useMarvelService from "../../services/MarvelService";

const SingleComicsPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);

  const { loading, error, getComic, getAllComics } = useMarvelService();

  useEffect(() => {
    console.log(getAllComics());
    updateComic();
    console.log("akame ga kill");
  }, [comicId]);

  const updateComic = () => {
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);

    console.log(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};
const View = ({ comic }) => {
  const { title, description, pageCount, price, language, thumbnail } = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">page:{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to={"/comics"} className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicsPage;
