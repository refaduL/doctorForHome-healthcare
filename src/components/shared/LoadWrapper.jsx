import Loader from "./Loader";

function LoadWrapper({ loading, children }) {
  if (loading) return <Loader />;
  return children;
}

export default LoadWrapper;