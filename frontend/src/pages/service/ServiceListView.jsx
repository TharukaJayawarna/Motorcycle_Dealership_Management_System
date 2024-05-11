import React, { useState } from "react";
import { useServiceData } from "../../hooks/useServiceData";

const ServiceListView = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  // Get the data from the react-query hook
  const { data, refetch } = useServiceData();

  // Filter services based on search query
  const filteredServices = data?.data?.services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">All Services</h1>

      {/* Search bar */}
      <div className="mb-3" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search services..."
          className="form-control"
          style={{ marginBottom: "10px", backgroundColor: "#e5e4e2" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* show all services in card grid */}
      <div className="row">
        {filteredServices?.map((service) => (
          <div className="col-md-4 mb-4" key={service._id}>
            <div className="card">
              <div className="card-body" style={{ backgroundColor: "#b9f2ff" }}>
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.description}</p>
                <p className="card-text">Price: Rs.{service.price}/=</p>
                <p className="card-text">
                  Duration: {service.duration} minutes
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceListView;



