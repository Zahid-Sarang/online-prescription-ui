import { createBrowserRouter } from "react-router-dom";
import PatientSignInPage from "./pages/login/PatientSignInPage";
import DoctorSignInPage from "./pages/login/DoctorSignInPage";
import DoctorPortalPage from "./pages/doctor/DoctorPortalPage";
import Root from "./layouts/Root";
import NonAuth from "./layouts/NonAuth";
import HomePage from "./pages/patient/HomePage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "",
				element: <HomePage />,
			},
			{
				path: "/doctor-portal",
				element: <DoctorPortalPage />,
			},
			{
				path: "/auth",
				element: <NonAuth />,
				children: [
					{
						path: "patient-signIn",
						element: <PatientSignInPage />,
					},
					{
						path: "doctor-signIn",
						element: <DoctorSignInPage />,
					},
				],
			},
		],
	},
]);
