import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const Page404 = lazy(() => import("../pages/Error404"));
const AppHeader = lazy(() => import("../appHeader/AppHeader"));
const SingleComicsPage = lazy(() => import("../pages/SingleComicsPage"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>Loading...</div>}>
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicsPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
