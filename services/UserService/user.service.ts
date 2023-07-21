import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { deserialize, serialize } from "serializr";
import { User } from "../../models/user.model";
import { Value } from "sass";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import notification from "antd/lib/notification";


const UserDataService = () => {
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User>();

  const fetchUserData = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(ApiRoutes.USERS_TABLE_DATA, {
        params: {
          page: currentPage,
        },
      });
      return response.data.data.docs;
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addUserData = async (values: User) => {
    setLoading(true);
    try {
      await axiosInstance.post(ApiRoutes.USERS_TABLE_DATA, values);
      console.log(`User with ID edited successfully.`);
      Notification({
        message: "User",
        description: "Created successfully",
        type:NotificationTypes.SUCCESS
      });
      setTimeout(() => {
      }, 1000);
    } catch (error: any) {
      let errorMessage = "";
      if (
        error.response.data.message.includes("duplicate key error")
      ) {
        if (error.response.data.message.includes("email")) {
          errorMessage = "Email ID already exists.";
        } else if (error.response.data.message.includes("phone")) {
          errorMessage = "Phone number already exists.";
        }
      }
      Notification({
        message: "Error",
        description: errorMessage,
        type:NotificationTypes.ERROR
      });
      setTimeout(() => {
      }, 1000);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const editUserData = async (values: User, id: string) => {
    setLoading(true);
    try {
      await axiosInstance.put(`${ApiRoutes.USERS_TABLE_DATA}/${id}`, values);
      console.log(`User with ID edited successfully.`);
      Notification({
        message: "User Details",
        description: "Edited successfully",
        type:NotificationTypes.SUCCESS
      });
      setTimeout(() => {
      }, 1000);
    } catch (error: any) {
      let errorMessage = "";
      if (
        error.response.data.message.includes("duplicate key error")
      ) {
        if (error.response.data.message.includes("email")) {
          errorMessage = "Email ID already exists.";
        } else if (error.response.data.message.includes("phone")) {
          errorMessage = "Phone number already exists.";
        }
      }
      Notification({
        message: "Error",
        description: errorMessage,
        type:NotificationTypes.ERROR
      });
      setTimeout(() => {
      }, 1000);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  


  const deleteUserData = async (id: string) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`${ApiRoutes.USERS_TABLE_DATA}/${id}`);
      console.log(`User with ID ${id} deleted successfully.`);
      Notification({
        message: "Admin",
        description: "Deleted successfully",
        type:NotificationTypes.SUCCESS
      });
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  const searchUserData = async (search: string) => {
    try {
      const payload = JSON.stringify({
          uid: search
      });
      const url = `${ApiRoutes.USERS_TABLE_DATA}?query=${payload}`;
      const response = await axiosInstance.get(url);
      console.log(response.data.data.docs);
      return response.data.data.docs;
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  };
  
  
  
  

  return {
    userData,
    error,
    loading,
    fetchUserData,
    addUserData,
    deleteUserData,
    editUserData,
    searchUserData,
  };
};

export default UserDataService;
