import { ClipLoader } from "react-spinners";

import s from "./Loader.module.css";

interface LoaderProps {
  text?: string;
  size?: number;
}

const Loader = ({ text = "Loading...", size = 32 }: LoaderProps) => {
  return (
    <div className={s.container} role="status" aria-live="polite">
      <ClipLoader size={size} />
      {text && <span className={s.text}>{text}</span>}
    </div>
  );
};

export default Loader;
