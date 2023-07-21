import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";


const ContainerService = () => {

  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
 

  const fetchContainerData = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(ApiRoutes.CONTAINERS_TABLE_DATA, {
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

  const searchContainerData = async (search: string) => {
    try {
      const response = await axiosInstance.get(ApiRoutes.CONTAINERS_TABLE_DATA, {
        params: {
          uid: search,
        }
      });
      return response.data.data;
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContainerDataTab = async (status: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(ApiRoutes.CONTAINERS_TABLE_DATA, {
        params: {
          status: status,
        },
      });
      return response.data.data.docs;
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEachContainerData = async (id: string) => {
    try {
      const response = await axiosInstance.get(`${ApiRoutes.CONTAINERS_TABLE_DATA}/${id}`);
      return response.data.data.container;
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  

    const fetchComments = async (id: string) => {
      try {
        const comments = await axiosInstance.get(`${ApiRoutes.COMMENTS}/${id}`);
        return comments.data.data["docs"];
        debugger
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const handleCommentSubmit = async (values:{ comment: string }, id:string) => {
      try {
  
        const { comment } = values;
        const requestBody = {
          comment: comment ? comment.toString() : '',
          container: id 
        };
        const response = await axiosInstance.post(ApiRoutes.COMMENTS, requestBody);
        console.log('Comment submitted:', response.data);
        fetchComments(id)
      
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    };
    
  

    const fetchLogs = async (id: string) => {
      try {
        const logs = await axiosInstance.get(`${ApiRoutes.LOGS}=${id}`);
        return logs.data.data.docs;
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchActivity = async (id: string) => {
      try {
        const activity = await axiosInstance.get(`${ApiRoutes.ACTIVITY}/${id}`);
        return activity.data.data.docs;
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

  return {
    // containerData,
    error,
    loading,
    fetchContainerData,
    searchContainerData,
    fetchContainerDataTab,
    fetchEachContainerData,
    fetchComments,
    handleCommentSubmit,
    fetchLogs,
    fetchActivity

  };
};

export default ContainerService;
