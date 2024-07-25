import React from "react";
// import { useAuthStore } from "../../store";
// import { redirect } from "react-router-dom";
import { Card, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { doctorInfo } from "../../http/api";

const { Meta } = Card;

const HomePage = () => {
	// const { user } = useAuthStore();

	const { data: doctors } = useQuery({
		queryKey: ["orders"],
		queryFn: async () => {
			return await doctorInfo().then((res) => res.data);
		},
	});

	console.log(data);

	return (
		<>
			<Row gutter={[16, 16]} style={{ padding: "20px" }}>
				{doctors.data.map((doctor) => (
					<Col key={doctor._id} xs={24} sm={12} md={8} lg={6} xl={4}>
						<Card hoverable cover={<img alt={doctor.name} src={doctor.profilePicture} />}>
							<Meta title={doctor.name} description={doctor.specialty} />
							<Link to={`/consult/${doctor._id}`}>
								<Button type="primary" style={{ marginTop: "10px" }}>
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
