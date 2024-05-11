import { useQuery } from "@tanstack/react-query";
import ServiceAPI from "../api/ServiceAPI";

export const useServiceData = () => {
  return useQuery(["services"], () => ServiceAPI.getAll());
};
