const Service = require("../modules/Service");

const serviceController = {
  // create service
  createService: async (req, res) => {
    try {
      const { name, description, price, duration } = req.body;

      const newService = new Service({
        name,
        description,
        price,
        duration,
      });

      const savedService = await newService.save();

      res.status(201).json({
        success: true,
        service: savedService,
        message: "Service created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all services
  getServices: async (req, res) => {
    try {
      const services = await Service.find();

      res.status(200).json({ success: true, services });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get service by id
  getServiceById: async (req, res) => {
    try {
      const serviceId = req.params.id;
      const service = await Service.findById(serviceId);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      res.status(200).json({ success: true, service });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update service
  updateService: async (req, res) => {
    try {
      const serviceId = req.params.id;
      const service = await Service.findById(serviceId);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      const updatedService = await Service.findByIdAndUpdate(
        serviceId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        service: updatedService,
        message: "Service updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete service
  deleteService: async (req, res) => {
    try {
      const serviceId = req.params.id;

      const service = await Service.findById(serviceId);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      const deletedService = await Service.findByIdAndDelete(serviceId);

      res.status(200).json({
        success: true,
        service: deletedService,
        message: "Service deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = serviceController;
