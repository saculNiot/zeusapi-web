import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import {
	Button,
	Layout,
	Row,
	Col,
	List,
	message,
	Skeleton,
	Popconfirm,
	Spin,
	Tooltip,
} from "antd";
import "./MainDashboard.less";
import { RoutePath } from "../../utils/routePath";
import { AuthContext } from "../../utils/AuthContext";
import { LocalStorage } from "../../utils/localStorage";
import { UserRepo } from "../../services/api/repositories/user_repo";
import { User } from "../../services/api/models/user_model";
import {
	DeleteOutlined,
	EditTwoTone,
	FundTwoTone,
	HeartOutlined,
	ReconciliationOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { UserUrl } from "../../services/api/models/url_model";
import Nav from "./Nav";
import mixpanel from "mixpanel-browser";
import { Link, Button as ChakraButton, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Title from "antd/lib/typography/Title";
import { ClientRepo } from "../../services/api/repositories/client_repo";
import { Client } from "../../services/api/models/client_model";
import { RoleRepo } from "../../services/api/repositories/role_repo";
import { RelationshipRepo } from "../../services/api/repositories/relationship_repo";

export const MainDashboard: React.FC<any> = () => {
	let clientRepo = new ClientRepo();

	let userRepo = new UserRepo();

	let roleRepo = new RoleRepo();

	let relationshipRepo = new RelationshipRepo();

	let history = useHistory();

	// Get current sign in User

	// Handle the state of each option in Menu bar

	const [_viewTitle, setViewTitle] = useState<string>("Clients");

	const [_viewList, setViewList] = useState<Array<any>>([]);

	const [_listLoading, setListLoading] = useState<boolean>(true);

	async function getClients() {
		setViewList([]);

		let apiResult = await clientRepo.getAllClients({
			history: history,
		});

		if (apiResult.isSuccess) {
			if (apiResult.data.length > 0)
				apiResult.data.forEach((element: Client) => {
					setViewList((prevState) => {
						return [...prevState, element];
					});
				});
		}
		setListLoading(false);
	}

	async function getRoles() {
		setViewList([]);
		let userId = await LocalStorage.getUserID();
		let apiResult = await roleRepo.getAllRoles({
			history: history,
		});

		if (apiResult.isSuccess) {
			if (apiResult.data.length > 0)
				apiResult.data.forEach((element: Client) => {
					setViewList((prevState) => {
						return [...prevState, element];
					});
				});
		}
		setListLoading(false);
	}
	async function getRelationships() {
		setViewList([]);
		let apiResult = await relationshipRepo.getAllRelationship({
			history: history,
		});

		if (apiResult.isSuccess) {
			if (apiResult.data.length > 0)
				apiResult.data.forEach((element: Client) => {
					setViewList((prevState) => {
						return [...prevState, element];
					});
				});
		}
		setListLoading(false);
	}

	async function deleteClient(clientId: string) {
		let apiResult = await clientRepo.deleteClient({
			history: history,
			clientId: clientId!,
		});
		if (apiResult.isSuccess) {
			setListLoading(true);
			getClients();
			message.success("Delete client success");
		} else {
			message.success("Delete Fail");
		}
		setListLoading(false);
	}
	async function deleteRole(roleId: string) {
		let apiResult = await roleRepo.deleteRole({
			history: history,
			roleId: roleId!,
		});
		if (apiResult.isSuccess) {
			setListLoading(true);
			getRoles();
			message.success("Delete role success");
		} else {
			message.success("Delete Fail");
		}
		setListLoading(false);
	}

	async function deleteRelationship(clientRoleRelId: string) {
		let apiResult = await relationshipRepo.deleteRelationship({
			history: history,
			clientRoleRelId: clientRoleRelId!,
		});
		if (apiResult.isSuccess) {
			setListLoading(true);
			getRelationships();
			message.success("Delete relationship success");
		} else {
			message.success("Delete Fail");
		}
		setListLoading(false);
	}

	useEffect(() => {
		async function initState() {
			let userId = await LocalStorage.getUserID();
			let apiResult = await userRepo.getUserById({
				userId: userId!,
			});
			if (apiResult.isSuccess) {
				let usermodel: User = apiResult.data[0];
				await LocalStorage.setEmail(usermodel?.email ?? "");
				await LocalStorage.setNickName(usermodel?.username ?? "");
				await LocalStorage.setPackagePlan(
					usermodel?.packagePlan ?? "free"
				);
			}
		}

		initState();
		getClients();

		return () => {
			setViewTitle("");
			setViewList([]);
			setListLoading(true);
		};
	}, []);

	return (
		<>
			<Nav />
			<Layout>
				<Row className="dashboard_row">
					<Col xs={24} xl={6} className="dashboard_col" span={6} />
					<Col xs={24} xl={12} className="dashboard_col" span={12}>
						<Stack spacing={6}>
							<Stack direction="row" spacing={4}>
								<ChakraButton
									leftIcon={<AddIcon />}
									colorScheme="blue"
									variant="solid"
									onClick={() => {
										history.push(RoutePath.create_client);
									}}
								>
									Add client
								</ChakraButton>

								<ChakraButton
									leftIcon={<AddIcon />}
									colorScheme="orange"
									variant="solid"
									onClick={() => {
										history.push(RoutePath.create_role);
									}}
								>
									Add Role
								</ChakraButton>

								<ChakraButton
									leftIcon={<AddIcon />}
									colorScheme="purple"
									variant="solid"
									onClick={() => {
										history.push({
											pathname:
												RoutePath.create_relationship,
										});
									}}
								>
									Role-Based
								</ChakraButton>
								<ChakraButton
									leftIcon={<AddIcon />}
									colorScheme="purple"
									variant="solid"
									onClick={() => {
										history.push({
											pathname:
												RoutePath.create_relationship_abac,
										});
									}}
								>
									Attribute-Based
								</ChakraButton>
							</Stack>

							<Stack direction="row" spacing={4}>
								<Tooltip
									placement="topLeft"
									title="View clients"
								>
									<Button
										icon={
											<UserOutlined
												style={{ color: "#1E90FF" }}
											/>
										}
										shape="round"
										size="large"
										onClick={async () => {
											setListLoading(true);
											setViewTitle("Clients");
											getClients();
										}}
									></Button>
								</Tooltip>
								<Tooltip placement="topLeft" title="View Roles">
									<Button
										icon={
											<ReconciliationOutlined
												style={{ color: "	#FFA500" }}
											/>
										}
										shape="round"
										size="large"
										onClick={() => {
											setListLoading(true);
											setViewTitle("Roles");
											getRoles();
										}}
									></Button>
								</Tooltip>
								<Tooltip
									placement="topLeft"
									title="View Relationship"
								>
									<Button
										icon={
											<HeartOutlined
												style={{ color: "#BA55D3" }}
											/>
										}
										shape="round"
										size="large"
										onClick={() => {
											setViewTitle("Relationships");
											getRelationships();
										}}
									></Button>
								</Tooltip>
								<Tooltip
									placement="topLeft"
									title="View Access Log"
								>
									<Button
										icon={
											<FundTwoTone twoToneColor="#DB7093"/>

										}
										shape="round"
										size="large"
										onClick={async () => {
											history.push(RoutePath.access_log_list)
										}}
									></Button>
								</Tooltip>
							</Stack>
							<Title level={3}>{_viewTitle}</Title>
						</Stack>

						<div style={{ height: "20px" }}></div>
						<Skeleton active loading={_listLoading}>
							<List
								itemLayout="horizontal"
								dataSource={_viewList}
								renderItem={(item, index) => (
									<List.Item
										actions={[
											<Tooltip
												placement="topLeft"
												title="Edit"
											>
												<Button
													shape="round"
													icon={
														<EditTwoTone twoToneColor="#270949" />
													}
													size={"large"}
													onClick={async () => {
														switch (_viewTitle) {
															case "Clients":
																history.push({
																	pathname:
																		RoutePath.create_client,
																	state: {
																		clientId:
																			item.clientId,
																	},
																});
																break;
															case "Roles":
																history.push({
																	pathname:
																		RoutePath.create_role,
																	state: {
																		roleId: item.roleId,
																	},
																});
																break;
															case "Relationships":
																history.push({
																	pathname:
																		RoutePath.create_relationship,
																	state: {
																		clientRoleRelId:
																			item.clientRoleRelId,
																	},
																});
																break;
															default:
																break;
														}
													}}
												/>
											</Tooltip>,
											<Popconfirm
												title="Are you sure you want to delete?"
												onCancel={() => {}}
												onConfirm={async () => {
													switch (_viewTitle) {
														case "Clients":
															deleteClient(
																item.clientId
															);
															break;
														case "Roles":
															deleteRole(
																item.roleId
															);
															break;
														case "Relationships":
															deleteRelationship(
																item.clientRoleRelId
															);
															break;
														default:
															break;
													}
												}}
											>
												<Button
													shape="round"
													icon={
														<DeleteOutlined
															style={{
																color: "red",
															}}
														/>
													}
													size={"large"}
												/>
											</Popconfirm>,
										]}
									>
										<List.Item.Meta
											title={
												<Link
													onClick={() => {
														switch (_viewTitle) {
															case "Clients":
																history.push({
																	pathname:
																		RoutePath.client_list,
																	state: {
																		clientId:
																			item.clientId,
																		name: item.name,
																	},
																});
																break;
															case "Roles":
																history.push({
																	pathname:
																		RoutePath.role_list,
																	state: {
																		roleId: item.roleId,
																		name: item.name,
																	},
																});
																break;
															case "Relationships":
																history.push({
																	pathname:
																		RoutePath.create_relationship,
																	state: {
																		clientRoleRelId:
																			item.clientRoleRelId,
																	},
																});
																break;
															default:
																break;
														}
													}}
												>
													{_viewTitle ===
													"Relationships"
														? `${item.client[0].name} having ${item.permission} permission in ${item.role[0].name}`
														: item.name}
												</Link>
											}
											description={`Created on ${new Date(
												item.createdDateTime ?? ""
											).toLocaleString()}`}
										/>
									</List.Item>
								)}
							/>{" "}
						</Skeleton>
					</Col>
					<Col xs={24} xl={12} className="dashboard_col" span={6} />
				</Row>
			</Layout>
		</>
	);
};
