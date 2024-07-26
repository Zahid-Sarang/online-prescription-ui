import { useState } from "react";
import { Form, Input, Button, Radio, Steps } from "antd";
import { Consultation } from "../../types";
import { useAuthStore } from "../../store";
import { Navigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createConsult } from "../../http/api";

const { Step } = Steps;

const MultiStepForm = () => {
	const { user } = useAuthStore();
	const { doctorId } = useParams();
	const [current, setCurrent] = useState(0);
	const [formData, setFormData] = useState({});
	const [form] = Form.useForm();

	const { mutate, isPending } = useMutation({
		mutationKey: ["consultation"],
		mutationFn: async (consult: Consultation) => {
			return await createConsult(consult);
		},
	});

	const next = () => {
		form
			.validateFields()
			.then((values) => {
				setFormData({ ...formData, ...values });
				setCurrent(current + 1);
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	if (user === null) {
		return <Navigate to={`/auth/patient-signIn?returnTo=${location.pathname}`} replace={true} />;
	} else if (user.role === "doctor") {
		return <Navigate to={`/doctor-portal`} replace={true} />;
	}

	if (!doctorId) {
		return <Navigate to={"/"} replace={true} />;
	}

	const onFinish = (values: Consultation) => {
		const finalData = { ...formData, ...values, patientId: user?._id, doctorId: doctorId };
		console.log("Form values: ", finalData);
		mutate(finalData);
	};

	const steps = [
		{
			title: "Step 1",
			content: (
				<>
					<Form.Item
						name="currentIllnessHistory"
						label="Current Illness History"
						rules={[{ required: true, message: "Please input the current illness history!" }]}
					>
						<Input.TextArea rows={4} />
					</Form.Item>
					<Form.Item
						name={["recentSurgery", "description"]}
						label="Recent Surgery Description"
						rules={[{ required: true, message: "Please input the recent surgery description!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name={["recentSurgery", "timeSpan"]}
						label="Recent Surgery Time Span"
						rules={[{ required: true, message: "Please input the recent surgery time span!" }]}
					>
						<Input />
					</Form.Item>
				</>
			),
		},
		{
			title: "Step 2",
			content: (
				<>
					<Form.Item
						name={["familyMedicalHistory", "diabetes"]}
						label="Diabetes"
						rules={[{ required: true, message: "Please select diabetes status!" }]}
					>
						<Radio.Group>
							<Radio value="Diabetic">Diabetic</Radio>
							<Radio value="Non-Diabetic">Non-Diabetic</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						name={["familyMedicalHistory", "allergies"]}
						label="Allergies"
						rules={[{ required: true, message: "Please input any allergies!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name={["familyMedicalHistory", "others"]}
						label="Others"
						rules={[{ required: true, message: "Please input other medical history!" }]}
					>
						<Input />
					</Form.Item>
				</>
			),
		},
	];

	return (
		<Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
			<Steps current={current}>
				{steps.map((item) => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>
			<div className="steps-content">{steps[current].content}</div>
			<div className="steps-action">
				{current < steps.length - 1 && (
					<Button type="primary" onClick={() => next()}>
						Next
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button type="primary" htmlType="submit" loading={isPending}>
						Submit
					</Button>
				)}
				{current > 0 && (
					<Button style={{ margin: "0 8px" }} onClick={() => prev()}>
						Previous
					</Button>
				)}
			</div>
		</Form>
	);
};

export default MultiStepForm;
