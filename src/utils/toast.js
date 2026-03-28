import toast from "react-hot-toast";

export const showSuccess = (msg) => {
  toast.success(msg || "Success");
};

export const showError = (msg) => {
  toast.error(msg || "Something went wrong");
};