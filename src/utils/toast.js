import toast from "react-hot-toast";

export const showSuccess = (msg) => {
  toast.success(msg || "Success");
};

export const showError = (msg) => {
  toast.error(msg || "Something went wrong");
};

export const showWarning = (msg) => {
  toast(msg || "Warning", {
    icon: "⚠️",
  });
};

export const showInfo = (msg) => {
  toast(msg || "Info", {
    icon: "ℹ️",
  });
};

export const showLoading = (msg) => {
  return toast.loading(msg || "Loading...");
};

export const showPromise = (promise, messages = {}) => {
  return toast.promise(promise, {
    loading: messages.loading || "Processing...",
    success: messages.success || "Completed successfully",
    error: messages.error || "Operation failed",
  });
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

export const dismissAllToasts = () => {
  toast.dismiss();
};