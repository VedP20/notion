"use client";

import { useEffect, useState } from "react";
import SettingsModal from "@/components/modals/settings-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState();

  useEffect(() => {
    setIsMounted(isMounted);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
    </>
  );
};
