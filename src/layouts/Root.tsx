import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { getSelf } from "../constants";

const Root = () => {
	const { setUser } = useAuthStore();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["self"],
		queryFn: getSelf,
		retry: (failureCount: number, error) => {
			if (error instanceof AxiosError && error.response?.status === 401) {
				return false;
			}
			return failureCount < 3;
		},
	});

	useEffect(() => {
		if (data) {
			setUser(data);
		}
	}, [data, setUser]);

	if (isLoading) {
		return <div>Loading....</div>;
	}

	return <Outlet />;
};

export default Root;
