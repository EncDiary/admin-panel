import Swal from "sweetalert2";

export const confirmationAlert = (title: string, text: string) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    focusCancel: true,
  });
};

export const errorAlert = (title: string, text?: string) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
  });
};
