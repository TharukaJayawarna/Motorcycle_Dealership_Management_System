import { useMutation } from "@tanstack/react-query";
import { useAppointmentStore } from "../../store/useAppointmentStore";
import { useAppointmentData } from "../../hooks/useAppointmentData";
import { BootstrapModal } from "../../Components";
import AppointmentAPI from "../../api/AppointmentAPI";
import Toast from "../../utils/Toast";
import { useState } from "react";

const ViewAppointmentModal = () => {
  // TODO: Get this from the store
  const user = {
    role: "ADMIN",
  };

  const [rescheduledDate, setRescheduledDate] = useState("");
  const [rescheduledTime, setRescheduledTime] = useState("");

  // Get the state and actions from the store
  const {
    isViewAppointmentModalOpen,
    closeViewAppointmentModal,
    selectedAppointment,
  } = useAppointmentStore((state) => ({
    isViewAppointmentModalOpen: state.isViewAppointmentModalOpen,
    closeViewAppointmentModal: state.closeViewAppointmentModal,
    selectedAppointment: state.selectedAppointment,
  }));

  // Get refetch function from react-query hook
  const { refetch } = useAppointmentData();

  // Update mutation
  const { mutate } = useMutation(AppointmentAPI.update, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeViewAppointmentModal();
      Toast({ type: "success", message: "Appointment updated successfully" });
    },
  });

  const handleButtonClick = (data) => {
    if (data.status === "rescheduled") {
      data.appointmentDate = rescheduledDate;
      data.appointmentTime = rescheduledTime;
    }
    mutate({ id: selectedAppointment._id, data });
  };

  return (
    <BootstrapModal
      show={isViewAppointmentModalOpen}
      handleClose={closeViewAppointmentModal}
      title="View Appointment"
    >
      <div className="container mt-2">
        {selectedAppointment && (
          <div>
            <p>
              Description: {selectedAppointment.description || "No description"}
            </p>
            <p>Services:</p>
            <ul>
              {selectedAppointment.services.map((service) => (
                <li key={service.service._id}>{service.service.name}</li>
              ))}
            </ul>
            <p>Price: Rs.{selectedAppointment.totalCost}</p>
            <p>
              Duration:{" "}
              {selectedAppointment.services.reduce(
                (acc, curr) => acc + curr.service.duration,
                0
              )}{" "}
              minutes
            </p>
          </div>
        )}
      </div>

      <hr />

      {user.role === "ADMIN" && (
        <>
          <div className="container mt-2">
            <label htmlFor="rescheduledDate" className="form-label">
              Rescheduled Date
            </label>
            <input
              type="date"
              id="rescheduledDate"
              className="form-control"
              value={rescheduledDate}
              onChange={(e) => setRescheduledDate(e.target.value)}
            />
            <label htmlFor="rescheduledTime" className="form-label mt-2">
              Rescheduled Time
            </label>
            <input
              type="time"
              id="rescheduledTime"
              className="form-control"
              value={rescheduledTime}
              onChange={(e) => setRescheduledTime(e.target.value)}
            />
          </div>

          <hr />

          <div className="d-flex justify-content-between">
            {/* set status to confirmed */}
            <button
              className="btn btn-success"
              onClick={() => handleButtonClick({ status: "confirmed" })}
            >
              Approve
            </button>
            {/* set status to rescheduled */}
            <button
              className="btn btn-warning"
              onClick={() => handleButtonClick({ status: "rescheduled" })}
              disabled={rescheduledDate === "" || rescheduledTime === ""}
            >
              Reschedule
            </button>
            {/* set status to rejected */}
            <button
              className="btn btn-danger"
              onClick={() => handleButtonClick({ status: "rejected" })}
            >
              Reject
            </button>
          </div>
        </>
      )}
    </BootstrapModal>
  );
};

export default ViewAppointmentModal;
