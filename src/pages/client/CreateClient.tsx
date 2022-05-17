import React, { useEffect, useState } from "react";
import { FillForm } from "../../utils/components";
import { FormLabel, Button as ChakraButton, Text } from "@chakra-ui/react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, message, Space } from "antd";
import { ClientRepo } from "../../services/api/repositories/client_repo";
import { LocalStorage } from "../../utils/localStorage";
import { useHistory, useLocation } from "react-router-dom";
import { Client } from "../../services/api/models/client_model";
import { RoutePath } from "../../utils/routePath";

export const CreateClient: React.FC<any> = () => {
	let location = useLocation();
	let history = useHistory();
	const locationState: any = location.state;
	const [form] = Form.useForm();
	const clientRepo = new ClientRepo();
	const [_clientData, setClientData] = useState<Client>();
	const [_isFormLoading, setFormLoading] = useState<boolean>(true);
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
		console.log(values["attribute"]);
		let apiResult = await clientRepo.saveClient({
			clientId:
				locationState !== undefined ? locationState.clientId : null,
			createdById: userId ?? "",
			name: values["name"],
			attribute: values["attribute"],
		});
		if (apiResult.isSuccess) {
			message.success("Client has saved");
			locationState !== undefined
				? history.replace(RoutePath.dashboard)
				: form.resetFields();
		} else {
			message.error("Fail to save");
		}
	};

	useEffect(() => {
		async function initState() {
			if (locationState !== undefined) {
				let apiResult = await clientRepo.getClientById({
					clientId: locationState.clientId!,
				});
				if (apiResult.isSuccess) {
					setClientData(
						new Client({
							name: apiResult.data[0].name,
							attribute: apiResult.data[0].attribute,
						})
					);
				}
			}
			setFormLoading(false);
		}

		initState();

		return () => {
			setClientData(new Client({}));
		};
	}, []);

	// Set Initial Values Using State in antd form
	useEffect(() => {
		form.resetFields();
	}, [_clientData]);

	return (
		<FillForm
			formComponents={children}
			title={"Client's Profile"}
			subtitle={"Please fill in the client's name and attributes"}
			initialValue={{
				name: _clientData?.name ?? "",
				attribute: _clientData?.attribute ?? "",
			}}
			form={form}
			onSubmit={onSubmit}
			isFormLoading={_isFormLoading}
		>
			{" "}
		</FillForm>
	);
};
