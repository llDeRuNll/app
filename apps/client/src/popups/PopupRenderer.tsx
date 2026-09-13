import usePopupStore from "../stores/popupStore";

import { popupTypeComponentMap } from "./popupConfig";

const PopupRenderer = () => {
  const open = usePopupStore((state) => state.open);

  const type = usePopupStore((state) => state.type);

  if (!open || !type) {
    return null;
  }

  return <>{popupTypeComponentMap[type]}</>;
};

export default PopupRenderer;
