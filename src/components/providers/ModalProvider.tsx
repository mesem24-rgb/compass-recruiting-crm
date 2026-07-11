"use client";

import { createContext, useContext, useState } from "react";
import AddCandidateModal from "@/components/candidates/AddCandidateModal";

type ModalContextType = {
  openCandidateModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [candidateOpen, setCandidateOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        openCandidateModal: () => setCandidateOpen(true),
      }}
    >
      {children}

      <AddCandidateModal
        open={candidateOpen}
        onClose={() => setCandidateOpen(false)}
      />
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModals must be used inside ModalProvider");
  }

  return context;
}