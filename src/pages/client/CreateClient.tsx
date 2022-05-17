import React from "react";
import { FillForm } from "../../utils/components";
import { FormLabel, Button as ChakraButton, Text } from "@chakra-ui/react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, message, Space } from "antd";
import { ClientRepo } from "../../services/api/repositories/client_repo";
import { LocalStorage } from "../../utils/localStorage";

export const CreateClient: React.FC<any> = () => {
	const [form] = Form.useForm();
	const clientRepo = new ClientRepo();
	const children = (
		<>
			<FormLabel>Name</FormLabel>
			<Form.Item
				name="name"
				rules={[
					{
						required: true,
						message: "Please input the Client's name",
					},
				]}
			>
				<Input placeholder="Name" style={{ width: "50%" }} />
			</Form.Item>
			<>
				<FormLabel>Attribute</FormLabel>
				<Form.List name="attribute">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Space
									key={key}
									style={{
										display: "flex",
										marginBottom: 8,
									}}
									align="baseline"
								>
									<Form.Item
										{...restField}
										name={[name, "key"]}
										rules={[
											{
												required: true,
												message:
													"Missing attribute key",
											},
										]}
									>
										<Input placeholder="Attribute Value" />
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, "value"]}
										rules={[
											{
												required: true,
												message:
													"Missing attribute value",
											},
										]}
									>
										<Input placeholder="Attribute value" />
									</Form.Item>
									<MinusCircleOutlined
										onClick={() => remove(name)}
									/>
								</Space>
							))}
							<Form.Item>
								<ChakraButton
									variant="outline"
									onClick={() => add()}
									leftIcon={<PlusOutlined color="blue.400" />}
								>
									<Text color="blue.400">Add Attribute</Text>
								</ChakraButton>
							</Form.Item>
						</>
					)}
				</Form.List>
			</>
		</>
	);

	const onSubmit = async (values: any) => {
		let userId = await LocalStorage.getUserID();
		console.log(values['attribute'])
		let apiResult = await clientRepo.saveClient({
			createdById: userId ?? "",
			name: values["name"],
			attribute: values["attribute"],
		});
		if (apiResult.isSuccess) {
			message.success("Client has created");
			form.resetFields();
		} else {
			message.error("Fail to save");
		}
	};

	return (
		<FillForm
			formComponents={children}
			title={"Client's Profile"}
			subtitle={"Please fill in the client's name and attributes"}
			initialValue={[]}
			form={form}
			onSubmit={onSubmit}
		>
			{" "}
		</FillForm>
	);
};
