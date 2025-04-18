import { FadeLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.Loader}>
      <FadeLoader
        color="rgba(19, 129, 0, 1)"
        height={20}
        radius={2}
        speedMultiplier={1}
        width={5}
      />
    </div>
  );
}
