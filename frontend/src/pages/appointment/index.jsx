import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useAppointmentStore } from "../../store/useAppointmentStore";
import {
  useAppointmentData,
  useCustomerAppointmentData,
} from "../../hooks/useAppointmentData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/Toast";
import AppointmentAPI from "../../api/AppointmentAPI";
import AddAppointmentModal from "./AddAppointmentModal";
import EditAppointmentModal from "./EditAppointmentModal";
import { BootstrapTable } from "../../Components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import ViewAppointmentModal from "./ViewAppointmentModal";

const index = () => {
  // TODO: Get this from the store
  const user = {
    role: "CUSTOMER",
  };

  // Get the state and actions from the store
  const {
    openAddAppointmentModal,
    openEditAppointmentModal,
    openViewAppointmentModal,
    setSelectedAppointment,
  } = useAppointmentStore((state) => ({
    openAddAppointmentModal: state.openAddAppointmentModal,
    openEditAppointmentModal: state.openEditAppointmentModal,
    openViewAppointmentModal: state.openViewAppointmentModal,
    setSelectedAppointment: state.setSelectedAppointment,
  }));

  // Get the data from the react-query hook

  // if user is ADMIN, show all appointments, if user is CUSTOMER, show only his/her appointments

  let result;

  if (user.role === "CUSTOMER") {
    // const { data, refetch } = useAppointmentData();
    result = useAppointmentData();
  } else {
    // const { data, refetch } = useCustomerAppointmentData();
    result = useCustomerAppointmentData();
  }

  const { data, refetch } = result;

  // Delete mutation
  const { mutate } = useMutation(AppointmentAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Appointment deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  // Edit function
  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    openEditAppointmentModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total appointments
    const appointments = data.data.appointments;

    // add new field called customer_name to each appointment object
    appointments.forEach((appointment) => {
      appointment.customer_name = appointment?.customer?.name;
    });

    const appointmentCount = appointments.length;
    //
    const additionalInfo = `Total Appointments: ${appointmentCount}`;
    //
    generatePDF(
      additionalInfo,
      [
        "customer_name",
        "description",
        "status",
        "appointmentDate",
        "appointmentTime",
        "totalCost",
      ],
      data.data.appointments,
      "appointments-report"
    );
  };

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    openViewAppointmentModal();
  };

  return (
    <div className="container mt-2">
      <AddAppointmentModal />
      <EditAppointmentModal />
      <ViewAppointmentModal />

      <h1 className="mb-4">Appointments</h1>

      {/* if user is CUSTOMER, show add appointment button */}
      {user.role === "CUSTOMER" && (
        <Button
          variant="primary"
          className="m-1"
          onClick={openAddAppointmentModal}
        >
          <IoMdAddCircleOutline className="mb-1" /> <span>Add Appointment</span>
        </Button>
      )}

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={[
            "Customer",
            "Status",
            "Date",
            "Time",
            "Total Cost",
            "Actions",
          ]}
          children={
            data &&
            data.data.appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td
                  onClick={() => handleView(appointment)}
                  className="cursor-pointer text-primary"
                >
                  <u>{appointment?.customer?.name}</u>
                </td>
                <td>
                  {/* if status is completed, show success badge | if status is pending, show gray badge | if status is rescheduled, show warning badge | if status is rejected, show danger badge */}
                  {appointment.status === "confirmed" ? (
                    <span className="badge bg-success">Confirmed</span>
                  ) : appointment.status === "pending" ? (
                    <span className="badge bg-secondary">Pending</span>
                  ) : appointment.status === "rescheduled" ? (
                    <span className="badge bg-warning">Rescheduled</span>
                  ) : (
                    <span className="badge bg-danger">Rejected</span>
                  )}
                </td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>Rs.{appointment.totalCost}/=</td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(appointment._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  {user.role === "CUSTOMER" && (
                    <Button
                      className="m-1 px-3"
                      variant="info"
                      onClick={() => handleEdit(appointment)}
                      size="sm"
                    >
                      <MdEditSquare className="mb-1 mx-1" />
                      <span>Edit</span>
                    </Button>
                  )}
                </td>
              </tr>
            ))
          }
        />
      </div>
    </div>
  );
};

export default index;
