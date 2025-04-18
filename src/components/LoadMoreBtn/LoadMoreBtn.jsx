import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ loadMoreOnClick, loading }) {
  return (
    <button onClick={loadMoreOnClick} className={css.LoadMore}>
      {loading ? "Loading..." : "Load More"}
    </button>
  );
}
