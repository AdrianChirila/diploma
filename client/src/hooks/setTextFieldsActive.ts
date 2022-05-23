import { useEffect } from "react";

export const useSetTextFieldsActive = () => {
  useEffect(() => window.M.updateTextFields(), []);
};
