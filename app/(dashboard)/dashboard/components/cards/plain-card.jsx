function PlainCard({ children, extraClass = "", showCursor = false }) {
  return (
    <div
      className={`bg-white rounded-lg p-4 ${
        showCursor ? "hover:bg-slate-100 hover:shadow-lg cursor-pointer" : ""
      } ${extraClass}`}
    >
      {children}
    </div>
  );
}

export default PlainCard;
