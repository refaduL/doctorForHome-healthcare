const Card = ({ children, className = "" }) => (
  <div className={`rounded-diag shadow-soft ${className}`}>{children}</div>
);
export default Card;