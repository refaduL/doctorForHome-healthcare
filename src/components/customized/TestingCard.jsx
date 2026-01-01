const TestingCard = ({ children, className = "" }) => (
  <div className={`rounded-diag shadow-soft ${className}`}>{children}</div>
);
export default TestingCard;
