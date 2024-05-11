import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useServiceStore } from "../../store/useServiceStore";
import { useServiceData } from "../../hooks/useServiceData";
import { BootstrapModal } from "../../Components";
import ServiceAPI from "../../api/ServiceAPI";
import Toast from "../../utils/Toast";

const AddServiceModal = () => {
  // Get the state and actions from the store
  const { isAddServiceModalOpen, closeAddServiceModal } = useServiceStore(
    (state) => ({
      isAddServiceModalOpen: state.isAddServiceModalOpen,
      closeAddServiceModal: state.closeAddServiceModal,
    })
  );

  // Get refetch function from react-query hook
  const { refetch } = useServiceData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(ServiceAPI.create, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddServiceModal();
      refetch();
      Toast({ type: "success", message: "Service created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    mutate(values);
    reset();
  };

  return (
    <BootstrapModal
      show={isAddServiceModalOpen}
      handleClose={closeAddServiceModal}
      title="Add Service"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="form-group">
          <label className="mb-2" htmlFor="name">Name</label>
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
        <div className="form-group">
          <label className="mb-2" htmlFor="description">Description</label>
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
        <div className="form-group">
          <label className="mb-2" htmlFor="price">Price</label>
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
        <div className="form-group">
          <label className="mb-2" htmlFor="duration">Duration (in minutes)</label>
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

        <button
          type="submit"
          className="btn btn-primary mt-3"
        >
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddServiceModal;


