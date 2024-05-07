import { toast } from "react-toastify";

export const addWindowClass = (classList) => {
  const window = document?.getElementById("root");
  if (window) {
    window.classList.add(classList);
  }
};

export const removeWindowClass = (classList) => {
  const window = document?.getElementById("root");
  if (window) {
    window.classList.remove(classList);
  }
};

export const processResponse = (res, errorMessage, successMessage, returnValue) => {
  if (res.ok) {
    if (successMessage) {
      toast.success(successMessage);
    }
    if (returnValue !== undefined) {
      return returnValue;
    }
    return res.data;
  }
  if (errorMessage) {
    toast.error(`${errorMessage}: ${res.statusText}`);
  }
  return undefined;
};