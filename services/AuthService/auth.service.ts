import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize } from "serializr";
import { User } from "../../models/user.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { useEffect, useState } from "react";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/routeConstants/appRoutes";
import { NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const UserService = () => {
	const navigate = useNavigate();

	const [error, setError] = useState<Error>();

	const [loading, setLoading] = useState(false);

	const { setAuthenticated, setUnauthenticated} = AuthContext();

	

	const loginUser = (data: User) => {
		setLoading(true);
		return axiosInstance
			.post(ApiRoutes.USER_LOGIN, data)
			.then((response) => {
				const user = deserialize(User, response.data["user"]);
				Notification({
					message: "Login",
					description: "Logged in successfully",
					type: NotificationTypes.SUCCESS,
				});
				setAuthenticated(user);
				// console.log("curr" ,response.data);
				const access_token = response.data.data.tokens.access_token;
				const refresh_token = response.data.data.tokens.refresh_token;
				localStorage.setItem('accessToken', access_token);
				localStorage.setItem('refreshToken', refresh_token);
				navigate(AppRoutes.CONTAINERS);
			})
			.catch((error) => {
				Notification({
					message: "Login failed",
					description: "incorrect email or password",
					type: NotificationTypes.ERROR,
				});
			
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const logoutUser = async () => {
		try {
		  setLoading(true);
		  await axiosInstance.delete(NavigationRoutes.LOGIN);
	
		  setLoading(false);
		  setUnauthenticated();
	
		  Notification({
			message: "Logout",
			description: "Logged out successfully",
			type: NotificationTypes.SUCCESS
		  });

		  navigate(NavigationRoutes.LOGIN);
		} catch (error: any) {
		  setLoading(false);
		  setError(error);
		  return false;
		}
	  };

  
	return {
		error,
		loading,
		loginUser,
		logoutUser,
	};
};

export default UserService;
