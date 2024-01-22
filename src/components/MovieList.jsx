export default function MovieList({ children }) {
  return (
    <div className="content">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">{children}</div>
    </div>
  );
}
