import { Link, Navigate } from "react-router-dom";
import LogoutButton from "../../components/logout/LogoutButton";
import { useAuthStore } from "../../store";
import { Card, Col, Row, Typography, Avatar, Space, Table, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getConsult } from "../../http/api";
import { Consultation } from "../../types";

const { Text, Title } = Typography;

const columns = [
	{
		title: "Patient Name",
		dataIndex: "patientId.name",
		key: "name",
		render: (_text: string, record: Consultation) => {
			return (
				<Space>
					<Typography.Text>{record.patientId.name}</Typography.Text>
				</Space>
			);
		},
	},
	{
		title: "Patient Age",
		dataIndex: "patientId.age",
		key: "age",
		render: (_text: string, record: Consultation) => {
			return (
				<Space>
					<Typography.Text>{record.patientId.age}</Typography.Text>
				</Space>
			);
		},
	},
	{
		title: "currentIllnessHistory",
		dataIndex: "currentIllnessHistory",
		key: "currentIllnessHistory",
	},
];

const DoctorPortalPage = () => {
	const { user } = useAuthStore();

	const { data: consultationData } = useQuery({
		queryKey: ["consultationData"],
		queryFn: async () => {
			return await getConsult().then((res) => res.data);
		},
	});

	console.log(consultationData);

	if (user === null) {
		return <Navigate to={`/auth/doctor-signIn?returnTo=${location.pathname}`} replace={true} />;
	} else if (user.role === "patient") {
		return <Navigate to={`/`} replace={true} />;
	}

	return (
		<>
			<LogoutButton />

			<Row style={{ margin: "20px" }} gutter={20}>
				<Col xs={12} sm={24} md={12} lg={8}>
					<Card
						title={
							<Row justify="space-between" align="middle">
								<Col>
									<Title level={4}>Doctor's Info</Title>
								</Col>
								<Col>
									<Avatar src={user.profilePicture} size={60} />
								</Col>
							</Row>
						}
					>
						<Space direction="vertical" size="middle" style={{ width: "100%" }}>
							<div>
								<Text strong>Name:</Text>
								<Text style={{ marginLeft: "5px" }}>{user.name}</Text>
							</div>
							<div>
								<Text strong>Specialty:</Text>
								<Text style={{ marginLeft: "5px" }}>{user.specialty}</Text>
							</div>
							<div>
								<Text strong>Email:</Text>
								<Text style={{ marginLeft: "5px" }}>{user.email}</Text>
							</div>
							<div>
								<Text strong>Phone Number:</Text>
								<Text style={{ marginLeft: "5px" }}>{user.phoneNumber}</Text>
							</div>
							<div>
								<Text strong>Years of Experience:</Text>
								<Text style={{ marginLeft: "5px" }}>{user.yearsOfExperience?.$numberDecimal}</Text>
							</div>
						</Space>
					</Card>
				</Col>

				<Col span={16}>
					<Card title="Consultations">
						<Table
							columns={[
								...columns,
								{
									title: "Actions",
									render: (_, record: Consultation) => {
										return (
											<Link to={`/prescription/${record._id}`}>
												<Button type="link">Add Prescription</Button>
											</Link>
										);
									},
								},
							]}
							dataSource={consultationData}
						></Table>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default DoctorPortalPage;
