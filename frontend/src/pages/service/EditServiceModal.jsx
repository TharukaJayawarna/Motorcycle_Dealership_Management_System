import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useServiceStore } from "../../store/useServiceStore";
import { useServiceData } from "../../hooks/useServiceData";
import { BootstrapModal } from "../../Components";
import Toast from "../../utils/Toast";
import ServiceAPI from "../../api/ServiceAPI";

const EditServiceModal = () => {
  // Get the state and actions from the store
  const { isEditServiceModalOpen, closeEditServiceModal, selectedService } =
    useServiceStore((state) => ({
      isEditServiceModalOpen: state.isEditServiceModalOpen,
      closeEditServiceModal: state.closeEditServiceModal,
      selectedService: state.selectedService,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useServiceData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(ServiceAPI.update, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditServiceModal();
      Toast({ type: "success", message: "Service updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedService._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedService changes
    if (selectedService) {
      setValue("name", selectedService.name);
      setValue("description", selectedService.description);
      setValue("price", selectedService.price);
      setValue("duration", selectedService.duration);
    }
  }, [selectedService, setValue]);

  return (
    <BootstrapModal
      show={isEditServiceModalOpen}
      handleClose={closeEditServiceModal}
      title={`Edit: ${selectedService?.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            {...register("name", { 
              required: true,
              pattern: /^[a-zA-Z,' ]+$/i, // Allows letters, commas, spaces, and apostrophes
            })}
          />
          {errors.name && (
            <small className="form-text text-danger">Name is required and should contain only letters, commas, spaces, and apostrophes</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            {...register("description", { 
              required: true,
              pattern: /^[a-zA-Z,.'\s]+$/i, // Allows letters, commas, periods, apostrophes, and spaces
            })}
          ></textarea>
          {errors.description && (
            <small className="form-text text-danger">Description is required and should contain only letters, commas, periods, apostrophes, and spaces</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            {...register("price", { 
              required: true,
              min: 0, // Allows only positive numbers
            })}
          />
          {errors.price && (
            <small className="form-text text-danger">Price is required and should be a positive number</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Duration (in minutes)
          </label>
          <input
            type="number"
            className="form-control"
            id="duration"
            name="duration"
            {...register("duration", { 
              required: true,
              min: 0, // Allows only positive numbers
            })}
          />
          {errors.duration && (
            <small className="form-text text-danger">Duration is required and should be a positive number</small>
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

export default EditServiceModal;


