import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;

    if (form.elements.topic.value.trim() === "") {
      toast("Please enter search term!", {
        icon: "🔍",
      });
      return;
    }

    onSearch(topic);
    form.reset();
  }

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <div>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="topic"
            className={css.input}
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
