import { Layout, Card, Space, Form, Input, Checkbox, Button, Flex, Alert, Typography } from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Credentials } from "../../types";
import { useAuthStore } from "../../store";
import { login } from "../../http/api";
import { Link } from "react-router-dom";
import { getSelf } from "../../constants";

const loginUser = async (credentials: Credentials) => {
	const { data } = await login(credentials);
	return data;
};

const SignInPage = () => {
	const { setUser } = useAuthStore();

	const { refetch } = useQuery({
		queryKey: ["self"],
		queryFn: getSelf,
		enabled: false,
	});

	const { mutate, isPending, isError, error } = useMutation({
		mutationKey: ["login"],
		mutationFn: loginUser,
		onSuccess: async () => {
			const selfDataPromise = await refetch();
			const userInfo = selfDataPromise.data?.data;
			setUser(userInfo);
		},
	});
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
						<Typography.Title>Doctors's Login</Typography.Title>
					</Layout.Content>
					<Card
						bordered={false}
						style={{ width: 300 }}
						title={
							<Space
								style={{
									width: "100%",
									fontSize: 16,
									justifyContent: "center",
								}}
							>
								<LockFilled />
								Sign in
							</Space>
						}
					>
						<Form
							initialValues={{
								remember: true,
							}}
							onFinish={(values) => {
								mutate({ email: values.username, password: values.password });
							}}
						>
							{isError && <Alert style={{ marginBottom: 24 }} type="error" message={error?.message} />}
							<Form.Item
								name="username"
								rules={[
									{
										required: true,
										message: "Please input your Username",
									},
									{
										type: "email",
										message: "Email is not valid",
									},
								]}
							>
								<Input prefix={<UserOutlined />} placeholder="Username" />
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: "Please input your password",
									},
								]}
							>
								<Input.Password prefix={<LockOutlined />} placeholder="Password" />
							</Form.Item>
							<Flex justify="space-between">
								<Form.Item name="remember" valuePropName="checked">
									<Checkbox>Remember me</Checkbox>
								</Form.Item>
								<a href="" id="login-form-forgot">
									Forgot password
								</a>
							</Flex>
							<Form.Item>
								<Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={isPending}>
									Log in
								</Button>
							</Form.Item>
						</Form>
						<Link to="/auth/patient-signIn">Login as a Patien</Link>
					</Card>
				</Space>
			</Layout>
		</>
	);
};

export default SignInPage;