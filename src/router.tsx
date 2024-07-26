import { createBrowserRouter } from "react-router-dom";
import PatientSignInPage from "./pages/login/PatientSignInPage";
import DoctorSignInPage from "./pages/login/DoctorSignInPage";
import DoctorPortalPage from "./pages/doctor/DoctorPortalPage";
import Root from "./layouts/Root";
import NonAuth from "./layouts/NonAuth";
import HomePage from "./pages/patient/HomePage";
import PatientSignUpPage from "./pages/register/PatientsSignUp";
import DoctorSignUpPage from "./pages/register/DoctorSingUp";
import ConsultationForm from "./pages/consultation/Form";

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
				path: "/consult/:doctorId",
				element: <ConsultationForm />,
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
						path: "patient-signUp",
						element: <PatientSignUpPage />,
					},
					{
						path: "doctor-signUp",
						element: <DoctorSignUpPage />,
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
