import Spinner from "./Spinner";

function LoadingButton({ loading, children, ...props }) {
  return (
    <button
      {...props}
      disabled={loading}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading && <Spinner size={14} />}
      {children}
    </button>
  );
}

export default LoadingButton;

// to use this component, simply wrap your button content with <LoadingButton> and pass the loading state as a prop. For example:
{/*
    <LoadingButton 
        loading={deletingId === p.id} 
        onClick={() => handleDelete(p.id)}
    >
        Delete
    </LoadingButton>; 
     
*/}
