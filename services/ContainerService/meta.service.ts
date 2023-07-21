
import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { Containers } from "../../models/container.model";
import { deserialize, serialize } from "serializr";
import moment from "moment";
import { Customer } from "../../models/customer.model";

const ContainerMetaService = () => {

    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);

    const fetchYardData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`${ApiRoutes.META}/yards`);
          return response.data.data.values;
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };      

      const fetchLengthData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`${ApiRoutes.META}/lengths`);
          return response.data.data.values;
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }; 

      const fetchHeightData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`${ApiRoutes.META}/heights`);
          return response.data.data.values;
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }; 

      const fetchTypeData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`${ApiRoutes.META}/container_types`);
          return response.data.data.values;
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }; 

      const fetchCustomerData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`${ApiRoutes.META}/customers`);
          const customerData= response.data.data;
          const customerNames = customerData.map((customer: any) => customer.name);
          return customerNames;
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }; 


      const fetchActivityStatusData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`${ApiRoutes.META}/activity_statuses`);
          return response.data.data.values;
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }; 


      const fetchFilteredData = async (
        selectedFilters: any,
        selectedYear: string | null
      ) => {
        try {
          let params = `status=${selectedFilters.status}&activity=${selectedFilters.activity}&yard=${selectedFilters.yard}`;
      
          if (selectedYear) {
            const formattedDate = moment(selectedYear).format("YYYY-MM-DD");
            params += `&date=${formattedDate}`;
          }
          const link = `${ApiRoutes.CONTAINERS_TABLE_DATA}?${params}`;
          const response = await axiosInstance.get(link);
          const containerData = deserialize(
            Containers,
            response.data.data.docs as unknown as Containers[]
          );
      
          return containerData;
        } catch (error) {
          throw error;
        }
      };

    return {
      error,
      loading,
      fetchYardData,
      fetchLengthData,
      fetchHeightData,
      fetchTypeData,
      fetchCustomerData,
      fetchActivityStatusData,
      fetchFilteredData
    };
  };
  
  export default ContainerMetaService;
  