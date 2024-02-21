"use client";

import Modal from "@/app/components/modals/modal";
import useRentModalStore from "@/app/hooks/useRentModalStore";
import { useState } from "react";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModalStore = useRentModalStore();

  const [step, setStep] = useState(STEPS.CATEGORY);
  return (
    <Modal
      title="Rent out your home!"
      isOpen={rentModalStore.isOpen}
      onClose={rentModalStore.onClose}
      onSubmit={() => {}}
      actionLabel="Submit"
    />
  );
};

export default RentModal;
