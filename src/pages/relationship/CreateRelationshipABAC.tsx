import React, { useEffect, useState } from "react";
import { FillForm } from "../../utils/components";
import {
	FormLabel,
	Button as ChakraButton,
	Text,
	Stack,
	Spinner,
	Button,
	Link,
} from "@chakra-ui/react";
import { Form, Input, message, Radio, Select, Space } from "antd";
import { LocalStorage } from "../../utils/localStorage";
import { RoleRepo } from "../../services/api/repositories/role_repo";
import { Role } from "../../services/api/models/role_model";
import { useHistory, useLocation } from "react-router-dom";
import { RoutePath } from "../../utils/routePath";
import { ClientRepo } from "../../services/api/repositories/client_repo";
import { Client } from "../../services/api/models/client_model";
import { RelationshipRepo } from "../../services/api/repositories/relationship_repo";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

export const CreateRelationshipABAC: React.FC<any> = () => {
	let location = useLocation();
	let history = useHistory();

	let clientRepo = new ClientRepo();
	let roleRepo = new RoleRepo();
	let relationshipRepo = new RelationshipRepo();

	const locationState: any = location.state;
	const [form] = Form.useForm();

	const [_roleList, setRoleList] = useState<Array<Role>>([]);
	const [_clientList, setClientList] = useState<Array<Client>>([]);
	const [_isRoleListLoading, setRoleListLoading] = useState<boolean>(true);
	const [_isClientListLoading, setClientListLoading] =
		useState<boolean>(true);

	async function getClients() {
		let apiResult = await clientRepo.getAllClients({
			history: history,
		});

		if (apiResult.isSuccess) {
			if (apiResult.data.length > 0)
				apiResult.data.forEach((element: Client) => {
					setClientList((prevState) => {
						return [...prevState, element];
					});
				});
		}
		setClientListLoading(false);
	}

	async function getRoles() {
		let apiResult = await roleRepo.getAllRoles({
			history: history,
		});

		if (apiResult.isSuccess) {
			if (apiResult.data.length > 0)
				apiResult.data.forEach((element: Client) => {
					setRoleList((prevState) => {
						return [...prevState, element];
					});
				});
		}
		setRoleListLoading(false);
	}

	const proceedToCreatePage = (value: string) => {
		if (
			value === RoutePath.create_client ||
			value === RoutePath.create_role
		)
			history.replace(value);
	};

	const children = (
		<>
			<FormLabel>Client</FormLabel>
			<Stack direction={"row"} spacing={4}>
				<Form.Item name="client">
					<Select
						placeholder="Select a client"
						onChange={proceedToCreatePage}
						style={{ width: "300px" }}
						allowClear
					>
						<Option value={RoutePath.create_client}>
							<Text color={"gray.500"}>
								{" "}
								Click here to create a new client
							</Text>
						</Option>
						{_clientList.map((item) => {
							return (
								<Option value={item.clientId}>
									{item.name}
								</Option>
							);
						})}
					</Select>
				</Form.Item>
				{_isClientListLoading ? <Spinner /> : <></>}
			</Stack>
			<Text>Or Client's Attribute</Text>
			<Form.List name="clientAttribute">
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
											message: "Missing attribute key",
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
											message: "Missing attribute value",
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
			<FormLabel>Role</FormLabel>
			<Stack direction={"row"} spacing={4}>
				<Form.Item name="role">
					<Select
						placeholder="Select a role"
						onChange={proceedToCreatePage}
						style={{ width: "300px" }}
						allowClear
					>
						<Option value={RoutePath.create_role}>
							<Text color={"gray.500"}>
								Click here to create a new role
							</Text>
						</Option>
						{_roleList.map((item) => {
							return (
								<Option value={item.roleId}>{item.name}</Option>
							);
						})}
					</Select>
				</Form.Item>
				{_isRoleListLoading ? <Spinner /> : <></>}
			</Stack>
			<Text>Or Role's Attribute</Text>
			<Form.List name="roleAttribute">
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
											message: "Missing attribute key",
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
											message: "Missing attribute value",
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
			<FormLabel>Permission</FormLabel>
			<Form.Item
				name="permission"
				rules={[
					{
						required: true,
						message: "Please choose the permission of the client!",
					},
				]}
			>
				<Radio.Group>
					<Radio.Button value="owner">Owner</Radio.Button>
					<Radio.Button value="editor">Editor</Radio.Button>
					<Radio.Button value="viewer">Viewer</Radio.Button>
				</Radio.Group>
			</Form.Item>
		</>
	);

	const onSubmit = async (values: any) => {
		console.log(values["clientAttribute"]);
		let userId = await LocalStorage.getUserID();
		let apiResult = await relationshipRepo.saveRelationshipABAC({
			history: history,
			clientRoleRelId:
				locationState !== undefined
					? locationState.clientRoleRelId
					: null,
			createdById: userId ?? "",
			client: values["client"],
			role: values["role"],
			permission: values["permission"],
			clientAttribute:
				values["clientAttribute"] === undefined
					? []
					: values["clientAttribute"],
			roleAttribute:
				values["roleAttribute"] === undefined
					? []
					: values["roleAttribute"],
		});
		if (apiResult.isSuccess) {
			message.success("Relationship has created");
			locationState !== undefined
				? history.replace(RoutePath.dashboard)
				: form.resetFields();
		} else {
			message.error(apiResult.message);
		}
	};

	useEffect(() => {
		getClients();
		getRoles();

		return () => {
			// setRoleData(new Role({}));
		};
	}, []);

	// Set Initial Values Using State in antd form
	useEffect(() => {
		form.resetFields();
	}, [_clientList, _roleList]);

	return (
		<FillForm
			formComponents={children}
			title={"Attribute-Based client role relationship details"}
			subtitle={"Please fill in the relationship"}
			initialValue={{}}
			form={form}
			onSubmit={onSubmit}
			isFormLoading={false}
		>
			{" "}
		</FillForm>
	);
};
