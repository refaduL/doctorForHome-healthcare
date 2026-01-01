export default function Button({ variant = "primary", className = "", children, ...props }) {
  const base = "px-6 py-3 font-semibold rounded-diag transition-all duration-300 ease-in-out";
  const variants = {
    primary: `${base} bg-primary text-light`,
    outline: `${base} bg-secondary/5 border border-primary text-dark`,
  };

  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
