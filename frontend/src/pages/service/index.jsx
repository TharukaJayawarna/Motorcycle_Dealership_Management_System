import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useServiceStore } from "../../store/useServiceStore";
import { useServiceData } from "../../hooks/useServiceData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/Toast";
import ServiceAPI from "../../api/ServiceAPI";
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";
import { BootstrapTable } from "../../Components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";

const index = () => {
  // Get the state and actions from the store
  const { openAddServiceModal, openEditServiceModal, setSelectedService } =
    useServiceStore((state) => ({
      openAddServiceModal: state.openAddServiceModal,
      openEditServiceModal: state.openEditServiceModal,
      setSelectedService: state.setSelectedService,
    }));

  // Get the data from the react-query hook
  const { data, refetch } = useServiceData();

  // Delete mutation
  const { mutate } = useMutation(ServiceAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Service deleted successfully" });
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
  const handleEdit = (service) => {
    setSelectedService(service);
    openEditServiceModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total services
    const services = data.data.services;
    const serviceCount = services.length;
    //
    const additionalInfo = `Total Services: ${serviceCount}`;
    //
    generatePDF(
      additionalInfo,
      ["name", "description", "price", "duration"],
      data.data.services,
      "services-report"
    );
  };

  return (
    <div className="container mt-2">
      <AddServiceModal />
      <EditServiceModal />

      <h1 className="mb-4">Services</h1>

      <Button variant="primary" className="m-1" onClick={openAddServiceModal}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add Service</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={["Name", "Description", "Price", "Duration", "Actions"]}
          children={
            data &&
            data.data.services.map((service) => (
              <tr key={service._id}>
                <td>{service.name}</td>
                <td style={{ maxWidth: "300px" }} className="text-wrap">
                  {service.description}
                </td>
                <td>{service.price}</td>
                <td>
                  {Math.floor(service.duration / 60)} H {service.duration % 60}{" "}
                  M
                </td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(service._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(service)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                    <span>Edit</span>
                  </Button>
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
