import { Button } from "antd";
import { useAuthStore } from "../../store";
import { logout } from "../../http/api";
import { Navigate } from "react-router-dom";

const LogoutButton = () => {
	const { logout: logoutStore } = useAuthStore();

	const handleLogout = async () => {
		await logout();
		logoutStore();
		return <Navigate to={`/auth/patient-signIn`} />;
	};
	return (
		<Button type="primary" onClick={handleLogout}>
			LogOut
		</Button>
	);
};

export default LogoutButton;
