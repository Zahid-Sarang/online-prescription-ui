import { Layout, Card, Space, Form, Input, Button, Alert, Typography, Upload, InputNumber } from "antd";
import { LockFilled, UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { UserRegister } from "../../http/api"; // Ensure this API function supports file uploads
import { Link, Navigate } from "react-router-dom";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { User } from "../../store";

const { Title } = Typography;

// Define the User type with FormData
interface Doctor {
	profilePicture: UploadFile[];
	name: string;
	specialty: string;
	email: string;
	phoneNumber: string;
	yearsOfExperience: number;
	password: string;
	role: string;
}

const registerUser = async (formData: FormData) => {
	const { data } = await UserRegister(formData as unknown as User);
	return data;
};

const DoctorSignUpPage = () => {
	const [form] = Form.useForm();
	const { mutate, isPending, isError, error } = useMutation({
		mutationKey: ["register"],
		mutationFn: registerUser,
	});

	// Form submit handler
	const handleFormSubmit = (values: Doctor) => {
		const { profilePicture, ...rest } = values;

		// Prepare FormData for file upload
		const formData = new FormData();

		// Check if profilePicture exists and has files
		if (profilePicture && profilePicture.length > 0) {
			formData.append("profilePicture", profilePicture[0].originFileObj as RcFile);
		}

		// Append other fields
		Object.entries(rest).forEach(([key, value]) => {
			formData.append(key, String(value)); // Ensure value is converted to string
		});

		mutate(formData, {
			onSuccess: (data) => {
				<Navigate to={`/doctor-portal`} replace={true} />;
				console.log("Registration successful:", data);
				// Handle successful registration
			},
			onError: (error) => {
				console.error("Registration failed:", error);
				// Handle registration error
			},
		});
	};

	return (
		<>
			<Layout style={{ height: "100vh", display: "grid", placeItems: "center" }}>
				<Space direction="vertical" align="center" size="large">
					<Layout.Content
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Title>Doctor's Sign Up</Title>
					</Layout.Content>
					<Card
						bordered={false}
						style={{ width: 400 }}
						title={
							<Space
								style={{
									width: "100%",
									fontSize: 16,
									justifyContent: "center",
								}}
							>
								<LockFilled />
								Sign Up
							</Space>
						}
					>
						<Form
							initialValues={{
								remember: true,
								role: "doctor", // Default role value
							}}
							form={form}
							onFinish={handleFormSubmit} // Set the form's onFinish prop
						>
							{isError && <Alert style={{ marginBottom: 24 }} type="error" message={error?.message} />}
							<Form.Item
								name="profilePicture"
								label="Profile Picture"
								valuePropName="fileList"
								getValueFromEvent={(e: UploadChangeParam<UploadFile<unknown>>) => e.fileList}
								rules={[
									{
										required: true,
										message: "Please upload a profile picture",
									},
								]}
							>
								<Upload
									name="profilePicture"
									listType="picture"
									accept="image/*"
									beforeUpload={() => false} // Disable automatic upload
								>
									<Button icon={<UploadOutlined />}>Upload</Button>
								</Upload>
							</Form.Item>
							<Form.Item
								name="name"
								rules={[
									{
										required: true,
										message: "Please input your name",
									},
								]}
							>
								<Input prefix={<UserOutlined />} placeholder="Name" />
							</Form.Item>
							<Form.Item
								name="specialty"
								rules={[
									{
										required: true,
										message: "Please input your specialty",
									},
								]}
							>
								<Input prefix={<UserOutlined />} placeholder="Specialty" />
							</Form.Item>
							<Form.Item
								name="email"
								rules={[
									{
										required: true,
										message: "Please input your email",
									},
									{
										type: "email",
										message: "Email is not valid",
									},
								]}
							>
								<Input prefix={<UserOutlined />} placeholder="Email" />
							</Form.Item>
							<Form.Item
								name="phoneNumber"
								rules={[
									{
										required: true,
										message: "Please input your phone number",
									},
									{
										pattern: /^\d{10}$/,
										message: "Phone number is invalid",
									},
								]}
							>
								<Input prefix={<UserOutlined />} placeholder="Phone Number" />
							</Form.Item>
							<Form.Item
								name="yearsOfExperience"
								rules={[
									{
										required: true,
										message: "Please input your years of experience",
									},
								]}
							>
								<InputNumber min={0} style={{ width: "100%" }} placeholder="Years of Experience" />
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: "Please input your password",
									},
									{
										type: "string",
										min: 6,
										message: "Password should be at least 6 characters long",
									},
								]}
							>
								<Input.Password prefix={<LockFilled />} placeholder="Password" />
							</Form.Item>
							<Form.Item name="role" hidden initialValue="doctor">
								<Input type="hidden" />
							</Form.Item>
							<Form.Item>
								<Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={isPending}>
									Sign Up
								</Button>
							</Form.Item>
						</Form>
						<Link to="/auth/doctor-signIn">Already have an account? Log in</Link>
					</Card>
				</Space>
			</Layout>
		</>
	);
};

export default DoctorSignUpPage;
