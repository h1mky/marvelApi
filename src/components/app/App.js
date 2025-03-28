import "./transition.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const Page404 = lazy(() => import("../pages/Error404"));
const AppHeader = lazy(() => import("../appHeader/AppHeader"));
const SingleComicsPage = lazy(() => import("../pages/SingleComicsPage"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/comics/:comicId" element={<SingleComicsPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>Loading...</div>}>
          <AppHeader />
          <main>
            <AnimatedRoutes />
          </main>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;

// key={location.pathname} указывает React, что каждый маршрут должен рассматриваться как уникальный элемент. Это важно, потому что:

//     CSSTransition работает на основе ключей (key), и при каждом изменении key компонент перерисовывается.
//     Если key остается неизменным, React не перерисовывает компонент, а просто обновляет его.
//     Если key изменяется (например, с / на /comics), CSSTransition понимает, что это новый элемент, и запускает анимацию входа/выхода.
