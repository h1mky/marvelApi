import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";
import "./comicsList.scss";
import { Link } from "react-router-dom";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../erorrMessage/ErorrMessage";
import PropTypes, { object } from "prop-types";

const ComicsList = ({ onComicsSelected }) => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { error, loading, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };
  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 9) {
      ended = true;
    }
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);

    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setComicsEnded((comicsEnded) => ended);
  };

  function renderItem(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          className="comics__item"
          key={i}
          // onClick={() => {
          //   console.log("Выбран комикс с ID:", item.id);
          //   onComicsSelected(item.id);
          // }}
        >
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  }

  const items = renderItem(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}

      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

ComicsList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default ComicsList;
