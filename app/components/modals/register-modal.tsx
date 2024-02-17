"use client";

import Heading from "@/app/components/heading";
import Input from "@/app/components/inputs/input";
import Modal from "@/app/components/modals/modal";
import useRegisterModalStore from "@/app/hooks/useRegisterModalStore";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const RegisterModal = () => {
  // Get the state from the Register Store
  const registerModalStore = useRegisterModalStore();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post(`/api/register`, data);
      registerModalStore.onClose();
    } catch (error) {
      console.log("[REGISTER_MODAL]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to StayHive"
        subtitle="Create an account!"
        center
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModalStore.isOpen}
      title="Sign Up"
      actionLabel="Continue"
      onClose={registerModalStore.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
