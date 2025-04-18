import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;

    if (form.elements.topic.value.trim() === "") {
      alert("Please enter search term!");
      return;
    }

    onSearch(topic);
    form.reset();
  }

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="topic"
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
