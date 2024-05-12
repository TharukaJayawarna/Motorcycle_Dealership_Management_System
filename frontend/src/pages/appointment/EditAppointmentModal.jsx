import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAppointmentStore } from "../../store/useAppointmentStore";
import {
  useAppointmentData,
  useCustomerAppointmentData,
} from "../../hooks/useAppointmentData";
import { BootstrapModal } from "../../Components";
import Toast from "../../utils/Toast";
import AppointmentAPI from "../../api/AppointmentAPI";


const EditAppointmentModal = () => {
  // TODO: Get this from the store
  const user = {
    role: "CUSTOMER",
  };

  // Get the state and actions from the store
  const {
    isEditAppointmentModalOpen,
    closeEditAppointmentModal,
    selectedAppointment,
  } = useAppointmentStore((state) => ({
    isEditAppointmentModalOpen: state.isEditAppointmentModalOpen,
    closeEditAppointmentModal: state.closeEditAppointmentModal,
    selectedAppointment: state.selectedAppointment,
  }));

  // Get refetch function from react-query hook
  let result;

  if (user.role === "ADMIN") {
    // const { data, refetch } = useAppointmentData();
    result = useAppointmentData();
  } else {
    // const { data, refetch } = useCustomerAppointmentData();
    result = useCustomerAppointmentData();
  }

  const { data, refetch } = result;

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(AppointmentAPI.update, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditAppointmentModal();
      Toast({ type: "success", message: "Appointment updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedAppointment._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedAppointment changes
    if (selectedAppointment) {
      setValue("description", selectedAppointment.description);
    }
  }, [selectedAppointment, setValue]);

  return (
    <BootstrapModal
      show={isEditAppointmentModalOpen}
      handleClose={closeEditAppointmentModal}
      title={`Edit: ${selectedAppointment?._id}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <small className="form-text text-danger">
              Description is required
            </small>
          )}
        </div>
        <hr />

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditAppointmentModal;
