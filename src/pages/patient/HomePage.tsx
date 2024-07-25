import { useQuery } from "@tanstack/react-query";
import { Card, Row, Col, Button } from "antd";
import { Link, Navigate } from "react-router-dom";
import { useAuthStore, User } from "../../store";
import { doctorInfo } from "../../http/api";
import "./HomePage.css"; // Import the custom CSS

const { Meta } = Card;

const HomePage = () => {
	const { user } = useAuthStore();

	const {
		data: doctors,
		isFetching,
		isLoading,
	} = useQuery({
		queryKey: ["orders"],
		queryFn: async () => {
			return await doctorInfo().then((res) => res.data);
		},
	});

	if (user === null) {
		return <Navigate to={`/auth/patient-signIn?returnTo=${location.pathname}`} replace={true} />;
	} else if (user.role === "doctor") {
		return <Navigate to={`/doctor-portal`} replace={true} />;
	}
	if (isFetching) {
		return <h1>Fetching...</h1>;
	}
	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	console.log(doctors);

	return (
		<>
			<Row gutter={[16, 16]} style={{ padding: "20px" }}>
				{doctors &&
					doctors.map((doctor: User) => (
						<Col key={doctor._id} xs={24} sm={12} md={8} lg={6} xl={4}>
							<Card
								hoverable
								cover={
									<img alt={doctor.name} src={doctor.profilePicture} style={{ height: "200px", objectFit: "cover" }} />
								}
								className="doctor-card"
							>
								<Meta
									title={<span className="doctor-name">Name: {doctor.name}</span>}
									description={<span className="doctor-specialty">specialty: {doctor.specialty}</span>}
								/>
								<Link to={`/consult/${doctor._id}`}>
									<Button type="primary" className="consult-button">
										Consult
									</Button>
								</Link>
							</Card>
						</Col>
					))}
			</Row>
		</>
	);
};
export default HomePage;
