import { useFormikContext } from "formik";
import React from "react";
import AppButton from "../AppButton";

function SubmitButton({ buttonStyles, title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      buttonStyles={buttonStyles}
      title={title}
      onPress={handleSubmit}
    />
  );
}

export default SubmitButton;
