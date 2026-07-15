"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import AddCandidateModal from "@/components/candidates/AddCandidateModal";
import ScheduleInterviewModal from "@/components/interviews/ScheduleInterviewModal";

/* SECTION: Modal Context Types */

type InterviewModalState = {
  open: boolean;
  candidateId: string | null;
};

type ModalContextType = {
  openCandidateModal: () => void;
  closeCandidateModal: () => void;

  openInterviewModal: (candidateId: string) => void;
  closeInterviewModal: () => void;
};

/* SECTION: Modal Context */

const ModalContext = createContext<ModalContextType | null>(null);

/* SECTION: Initial Interview Modal State */

const initialInterviewModalState: InterviewModalState = {
  open: false,
  candidateId: null,
};

/* SECTION: Modal Provider */

export default function ModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [candidateOpen, setCandidateOpen] = useState(false);

  const [interviewModal, setInterviewModal] =
    useState<InterviewModalState>(initialInterviewModalState);

  function openInterviewModal(candidateId: string) {
    setInterviewModal({
      open: true,
      candidateId,
    });
  }

  function closeInterviewModal() {
    setInterviewModal(initialInterviewModalState);
  }

  return (
    <ModalContext.Provider
      value={{
        openCandidateModal: () => setCandidateOpen(true),
        closeCandidateModal: () => setCandidateOpen(false),
        openInterviewModal,
        closeInterviewModal,
      }}
    >
      {children}

      {/* SECTION: Add Candidate Modal */}

      <AddCandidateModal
        open={candidateOpen}
        onClose={() => setCandidateOpen(false)}
      />

      {/* SECTION: Schedule Interview Modal */}

      {interviewModal.candidateId && (
        <ScheduleInterviewModal
          open={interviewModal.open}
          candidateId={interviewModal.candidateId}
          onClose={closeInterviewModal}
        />
      )}
    </ModalContext.Provider>
  );
}

/* SECTION: Modal Context Hook */

export function useModals() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModals must be used inside ModalProvider");
  }

  return context;
}