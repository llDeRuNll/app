import { create } from "zustand";

import type { PopupMetadata, PopupType } from "../popups/popupConfig";

interface OpenPopupPayload {
  type: PopupType;
  metadata?: PopupMetadata;
  onAcceptCallback?: () => void;
  onDismissCallback?: () => void;
}

interface PopupStore {
  open: boolean;
  type: PopupType | null;
  metadata: PopupMetadata | null;
  onAcceptCallback?: () => void;
  onDismissCallback?: () => void;
  openPopup: (payload: OpenPopupPayload) => void;
  closePopup: () => void;
  handleAccept: () => void;
  handleDismiss: () => void;
}

const initialState = {
  open: false,
  type: null,
  metadata: null,
  onAcceptCallback: undefined,
  onDismissCallback: undefined,
};

const usePopupStore = create<PopupStore>((set, get) => ({
  ...initialState,

  openPopup: ({ type, metadata, onAcceptCallback, onDismissCallback }) => {
    set({
      open: true,
      type,
      metadata: metadata ?? null,
      onAcceptCallback,
      onDismissCallback,
    });
  },

  closePopup: () => {
    set(initialState);
  },

  handleAccept: () => {
    const callback = get().onAcceptCallback;

    set(initialState);

    callback?.();
  },

  handleDismiss: () => {
    const callback = get().onDismissCallback;

    set(initialState);

    callback?.();
  },
}));

export default usePopupStore;
