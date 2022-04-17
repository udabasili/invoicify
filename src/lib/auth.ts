import { getUser } from "@/features/auth/api/getUser";
import { login } from "@/features/auth/api/login";
import { register } from "@/features/auth/api/register";
import { signOut } from "@/features/auth/api/signOut";
import {
	LoginCredentialsDTO,
	RegisterCredentialsDTO,
	AuthUser,
} from "@/features/auth/types";
import { clearError, setError } from "@/features/error/reducer/errorSlice";
import { setCurrentUser } from "@/features/user/slice/userSlice";
import { UserAttributes } from "@/features/user/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

async function handleUserResponse(data: AuthUser) {
	return data;
}

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
	const currentUser = useAppSelector((state) => state.user.currentUser);
	const navigate = useNavigate();
	const userId = currentUser?.userId || ''

	async function loginFn(data: LoginCredentialsDTO) {
		try {
			dispatch(clearError());
			const response = await login(data);
			const user = await handleUserResponse(response.data.message);
			dispatch(setCurrentUser(user));
			navigate("/");
			return 'success';
		} catch (error) {
			const errorObject = error as AxiosError;

			if (errorObject.isAxiosError) {
				dispatch(setError(errorObject.response?.data.message));
				console.log(errorObject.response?.data.message);
				return;
			}
			dispatch(setError(errorObject.message));
		}
	}

	async function registerFn(data: RegisterCredentialsDTO) {
		try {
			const response = await register(data);
			const user = await handleUserResponse(response.data.message);
			dispatch(clearError());
			dispatch(setCurrentUser(user));
			navigate("/");
			return 'success';
		} catch (error) {
			const errorObject = error as AxiosError;
			if (errorObject.isAxiosError) {
				dispatch(setError(errorObject.response?.data.message));
				return;
			}
			dispatch(setError(errorObject.message));
		}
	}

	async function loadUser() {
		try {
			const response = await getUser(userId);
			const user = await handleUserResponse(response.data.message);
			dispatch(clearError());
			dispatch(setCurrentUser(user));
		} catch (error) {
			console.error(error);
		}
	}

	async function logoutFn() {
		try {
			await signOut();
			dispatch(clearError());
			dispatch(setCurrentUser({} as UserAttributes));
			navigate("/login");
		} catch (error) {
			const errorObject = error as AxiosError;
			if (errorObject.isAxiosError) {
				dispatch(setError(errorObject.response?.data.message));
				return;
			}
			dispatch(setError(errorObject.message));
		}
	}

	return {
		loginFn,
		registerFn,
		loadUser,
		isAuthenticated,
		currentUser,
		logoutFn
	};
};
