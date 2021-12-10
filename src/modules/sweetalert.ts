import Swal from "sweetalert2";

export const confirmationAlert = (title: string, text: string) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    reverseButtons: true,
    customClass: {
      confirmButton: "btn btn-danger m-2",
      cancelButton: "btn btn-secondary m-2",
    },
    buttonsStyling: false,
    confirmButtonText: "Удалить",
    cancelButtonText: "Отмена",
    focusCancel: true,
  });
};
