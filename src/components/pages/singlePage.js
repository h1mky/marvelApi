import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";

import AppBanner from "../appBanner/AppBanner";
import SetContent from "../../utils/SetContent";

// Хотелось бы вынести функцию по загрузке данных как отдельный аргумент
// Но тогда мы потеряем связь со стэйтами загрузки и ошибки
// А если вынесем их все в App.js - то они будут одни на все страницы

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const {
    loading,
    error,
    getComic,
    getCharacter,
    clearError,
    process,
    setProcess,
  } = useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();

    switch (dataType) {
      case "comic":
        getComic(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
        break;
      case "character":
        getCharacter(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  return (
    <>
      <AppBanner />
      {SetContent(process, Component, data)}
    </>
  );
};

export default SinglePage;
