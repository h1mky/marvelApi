import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const _apiBase = "https://marvel-server-zeta.vercel.app/";
  const _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
  const _baseOffset = 0; // Changed to 0 since the new API has IDs from 1-20

  const { loading, request, error, clearError, process, setProcess } =
    useHttp();

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };
  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    console.log(res);
    return res.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `https://marvel-server-zeta.vercel.app/comics?limit=10&offset=${offset}&apikey=d4eecb0c66dedbfae4eab45d312fc1df`
    );
    console.log("API Response:", res);
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description
        ? `${comics.description.slice(0, 210)}...`
        : "There is no description for this comics",
      pageCount: comics.pageCount,
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      language:
        comics.textObjects.length > 0
          ? comics.textObjects[0].languages
          : "Unknown",
      price:
        comics.prices.length > 0 ? comics.prices[0].price : "Not available",
    };
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0]?.url || "#",
      wiki: char.urls[1]?.url || "#",
      comics: char.comics.items,
    };
  };
  return {
    loading,
    error,
    process,
    setProcess,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    getCharacterByName,
    clearError,
  };
};

export default useMarvelService;
