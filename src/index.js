import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./style/style.scss";
import MarvelService from "./services/MarvelService";

// const marvelService = new MarvelService();
// marvelService.getAllCharacters().then((res) =>
//   console.log(
//     res.data.results.forEach((item) => {
//       console.log(item.name);
//     })
//   )
// );
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
