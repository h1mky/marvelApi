import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";
import "./comicsList.scss";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../erorrMessage/ErorrMessage";
import PropTypes from "prop-types";

const SetContent = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;

    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("unexpected process state ");
  }
};

const ComicsList = ({ onComicsSelected }) => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { error, loading, getAllComics, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset)
      .then(onComicsListLoaded)
      .then(() => setProcess("confirmed"));
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
        <CSSTransition key={item.id} timeout={500} classNames="comics__item">
          <li className="comics__item">
            <Link to={`/comics/${item.id}`}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="comics__item-img"
                style={imgStyle}
              />
              <div className="comics__item-name">{item.title}</div>
              <div className="comics__item-price">{item.price}</div>
            </Link>
          </li>
        </CSSTransition>
      );
    });
    return (
      <TransitionGroup component="ul" className="comics__grid">
        {items}
      </TransitionGroup>
    );
  }

  return (
    <div className="comics__list">
      {SetContent(process, () => renderItem(comicsList), newItemLoading)}
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
