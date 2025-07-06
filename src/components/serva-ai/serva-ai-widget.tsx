
"use client";

import { AnimatePresence } from "framer-motion";
import { ServaAIPopup } from "./serva-ai-popup";
import { useServaAI } from "@/hooks/use-serva-ai";

export function ServaAIWidget() {
  const { isOpen } = useServaAI();

  return (
    <AnimatePresence>
      {isOpen && <ServaAIPopup />}
    </AnimatePresence>
  );
}
