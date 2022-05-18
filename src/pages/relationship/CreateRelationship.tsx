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
import { Form, Input, message, Radio, Select } from "antd";
import { LocalStorage } from "../../utils/localStorage";
import { RoleRepo } from "../../services/api/repositories/role_repo";
import { Role } from "../../services/api/models/role_model";
import { useHistory, useLocation } from "react-router-dom";
import { RoutePath } from "../../utils/routePath";
import { UserRepo } from "../../services/api/repositories/user_repo";
import { ClientRepo } from "../../services/api/repositories/client_repo";
import { Client } from "../../services/api/models/client_model";
import { RelationshipRepo } from "../../services/api/repositories/relationship_repo";

const { Option } = Select;

export const CreateRelationship: React.FC<any> = () => {
	let location = useLocation();
	let history = useHistory();

	let clientRepo = new ClientRepo();
	let roleRepo = new RoleRepo();
	let relationshipRepo = new RelationshipRepo();

	const locationState: any = location.state;
	const [form] = Form.useForm();

	const [_roleList, setRoleList] = useState<Array<Role>>([]);
	const [_clientList, setClientList] = useState<Array<Client>>([]);
	const [_isFormLoading, setFormLoading] = useState<boolean>(true);
	const [_isRoleListLoading, setRoleListLoading] = useState<boolean>(true);
	const [_isClientListLoading, setClientListLoading] =
		useState<boolean>(true);

	async function getClients() {
		let userId = await LocalStorage.getUserID();
		let apiResult = await clientRepo.getAllClients({
			userId: userId!,
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
		let userId = await LocalStorage.getUserID();
		let apiResult = await roleRepo.getAllRoles({
			userId: userId!,
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
				<Form.Item
					name="client"
					rules={[
						{
							required: true,
							message: "Please select a client",
						},
					]}
				>
					<Select
						placeholder="Select a client"
						onChange={proceedToCreatePage}
						style={{width:"300px"}}
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
			<FormLabel>Role</FormLabel>
			<Stack direction={"row"} spacing={4}>
				<Form.Item
					name="role"
					rules={[
						{
							required: true,
							message: "Please select a role",
						},
					]}
				>
					<Select
						placeholder="Select a role"
						onChange={proceedToCreatePage}
						style={{width:"300px"}}
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
		console.log(values["client"]);
		let userId = await LocalStorage.getUserID();
		let apiResult = await relationshipRepo.saveRelationship({
			clientRoleRelId:
				locationState !== undefined ? locationState.roleId : null,
			createdById: userId ?? "",
			client: values["client"],
			role: values["role"],
			permission: values["permission"],
		});
		if (apiResult.isSuccess) {
			message.success("Relationship has created");
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
				let apiResult = await roleRepo.getRoleById({
					roleId: locationState.roleId!,
				});
				if (apiResult.isSuccess) {
					// setRoleData(
					// 	new Role({
					// 		name: apiResult.data[0].name,
					// 	})
					// );
				}
			}
			setFormLoading(false);
		}

		initState();
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
			title={"Client role relationship details"}
			subtitle={"Please fill in the relationship"}
			initialValue={{}}
			form={form}
			onSubmit={onSubmit}
			isFormLoading={_isFormLoading}
		>
			{" "}
		</FillForm>
	);
};
