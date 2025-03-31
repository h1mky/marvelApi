import Skeleton from "../components/skeleton/Skeleton";
import ErrorMessage from "../components/erorrMessage/ErorrMessage";
import Spinner from "../components/spinner/Spinner";

const SetContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;

    case "loading":
      return <Spinner />;
    case "confirmed":
      return <Component data={data} />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("unexpected process state ");
  }
};
export default SetContent;
