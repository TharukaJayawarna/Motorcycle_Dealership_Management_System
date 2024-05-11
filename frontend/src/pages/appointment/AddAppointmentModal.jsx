import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAppointmentStore } from "../../store/useAppointmentStore";
import { useAppointmentData, useCustomerAppointmentData } from "../../hooks/useAppointmentData";
import { BootstrapModal } from "../../Components";
import AppointmentAPI from "../../api/AppointmentAPI";
import Toast from "../../utils/Toast";
import { useServiceData } from "../../hooks/useServiceData";
import { useState } from "react";
import { ImCross } from "react-icons/im";

const AddAppointmentModal = () => {
  // TODO: Get this from the store
  const user = {
    role: "CUSTOMER",
  };

  // selected services
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const addService = (service) => {
    // should not add the same service twice
    if (!selectedServices.find((s) => s._id === service._id)) {
      setSelectedServices([...selectedServices, service]);
      setTotalCost(totalCost + service.price);
    } else {
      Toast({ type: "error", message: "Service already added" });
    }
  };

  const removeService = (service) => {
    setSelectedServices(selectedServices.filter((s) => s._id !== service._id));
    setTotalCost(totalCost - service.price);
  };

  // Get the state and actions from the store
  const { isAddAppointmentModalOpen, closeAddAppointmentModal } =
    useAppointmentStore((state) => ({
      isAddAppointmentModalOpen: state.isAddAppointmentModalOpen,
      closeAddAppointmentModal: state.closeAddAppointmentModal,
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
  const { data: services } = useServiceData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(AppointmentAPI.create, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddAppointmentModal();
      refetch();
      Toast({ type: "success", message: "Appointment created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    // add the selected services to the values
    values.services = selectedServices.map((service) => service._id);

    // add the total cost to the values
    values.totalCost = totalCost;
    mutate(values);
    reset();
    setSelectedServices([]);
    setTotalCost(0);
  };

  return (
    <BootstrapModal
      show={isAddAppointmentModalOpen}
      handleClose={closeAddAppointmentModal}
      title="Add Appointment"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="form-group">
          <label className="my-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            {...register("description", {
              required: true,
              pattern: /^[a-zA-Z,.'\s]+$/, // Allow letters, commas, periods, apostrophes, and spaces
            })}
          ></textarea>
          {errors.description && (
            <small className="form-text text-danger">
              Description is required and should contain only letters, commas, periods, apostrophes, and spaces
            </small>
          )}
        </div>

        <div
          className={`${
            selectedServices.length > 0 ? "border p-3 my-3" : "my-3"
          }`}
        >
          <div className="form-group">
            {selectedServices.length === 0 && (
              <label className="my-2" htmlFor="service">
                Service
              </label>
            )}
            <select
              className="form-control"
              id="service"
              name="service"
              onChange={(e) => {
                if (e.target.value === "") return;
                const service = services.data.services.find(
                  (s) => s._id === e.target.value
                );
                addService(service);
                // reset the select value
                e.target.value = "";
              }}
            >
              <option value="">Select a service</option>
              {services &&
                services.data.services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
            </select>
            {errors.service && (
              <small className="form-text text-danger">
                Service is required
              </small>
            )}
          </div>

          {/* show selected services */}
          {selectedServices.length > 0 && (
            <>
              <div className="my-3 d-flex flex-wrap">
                {selectedServices.map((service) => (
                  <SelectedService
                    key={service._id}
                    service={service}
                    removeService={removeService}
                  />
                ))}
              </div>
            </>
          )}

          {/* Show Total Cost */}
          {selectedServices.length > 0 && (
            <div className="my-3">
              <h5>Total Cost</h5>
              <p>Rs.{totalCost}/=</p>
            </div>
          )}
        </div>

        <div className="form-group">
  <label className="my-2" htmlFor="appointmentDate">
    Appointment Date
  </label>
  <input
    type="date"
    className="form-control"
    id="appointmentDate"
    name="appointmentDate"
    {...register("appointmentDate", { 
      required: true,
      min: new Date().toISOString().split("T")[0] // Set minimum date to today
    })}
  />
  {errors.appointmentDate && (
    <small className="form-text text-danger">
    Appointment Date is required and  Cannot Add Past Dates
    </small>
  )}
</div>

      
        <div className="form-group">
          <label className="my-2" htmlFor="appointmentTime">
            Appointment Time
          </label>
          <input
            type="time"
            className="form-control"
            id="appointmentTime"
            name="appointmentTime"
            {...register("appointmentTime", { required: true })}
          />
          {errors.appointmentTime && (
            <small className="form-text text-danger">
              Appointment Time is required
            </small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={selectedServices.length === 0 || totalCost === 0}
        >
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddAppointmentModal;

const SelectedService = ({ service, removeService }) => {
  return (
    <div className="bg-primary d-flex align-items-center m-1 p-1 rounded">
      <div className="badge bg-primary text-wrap " style={{ width: "10rem" }}>
        {service.name}
      </div>
      <ImCross
        size={20}
        className="text-white m-1"
        onClick={() => removeService(service)}
      />
    </div>
  );
};
