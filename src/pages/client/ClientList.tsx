import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import { Layout, Row, Col, Space, message, Skeleton, Table } from "antd";
import { AuthContext } from "../../utils/AuthContext";
import { LocalStorage } from "../../utils/localStorage";
import { UserRepo } from "../../services/api/repositories/user_repo";
import { User } from "../../services/api/models/user_model";
import { ClientRepo } from "../../services/api/repositories/client_repo";
import { Client } from "../../services/api/models/client_model";
import { RoleRepo } from "../../services/api/repositories/role_repo";
import { RelationshipRepo } from "../../services/api/repositories/relationship_repo";
import { Role } from "../../services/api/models/role_model";
import { Relationship } from "../../services/api/models/relationship_model";
import { Box, Button, Flex, Spacer, Stack } from "@chakra-ui/react";
import Title from "antd/lib/typography/Title";
import { RoutePath } from "../../utils/routePath";

export const ClientList: React.FC<any> = () => {
	let clientRepo = new ClientRepo();

	let userRepo = new UserRepo();

	let roleRepo = new RoleRepo();

	let relationshipRepo = new RelationshipRepo();

	let location = useLocation();
	let history = useHistory();
	const locationState: any = location.state;

	// Get current sign in User
	const user = useContext(AuthContext);

	// Handle the state of each option in Menu bar

	const [_viewTitle, setViewTitle] = useState<string>("Clients");

	const [_viewList, setViewList] = useState<Array<Relationship>>([]);

	const [_listLoading, setListLoading] = useState<boolean>(true);

	async function getClient() {
		setViewList([]);

		
		let apiResult = await clientRepo.getClientById({
			clientId: locationState.clientId!,
		});

		if (apiResult.isSuccess) {
			if (apiResult.data[0].roles !== undefined) {
				setViewList(
					apiResult.data[0].roles.map(
						(item: Relationship, index: number) => {
							console.log(index);

							return {
								index: index + 1,
								key: item.clientRoleRelId,
								clientRoleRelId: item.clientRoleRelId,
								name: item.role![0].name,
								permission: item.permission,
								createdDateTime: new Date(
									item.createdDateTime ?? ""
								).toLocaleString(),
							};
						}
					)
				);
			}
		}
		setListLoading(false);
	}

	async function deleteClient(clientId: string) {
		let apiResult = await clientRepo.deleteClient({
			clientId: clientId!,
		});
		if (apiResult.isSuccess) {
			setListLoading(true);
			history.replace(RoutePath.dashboard);
			message.success("Delete client success");
		} else {
			message.success("Delete Fail");
		}
		setListLoading(false);
	}

	async function deleteRelationship(clientRoleRelId: string) {
		let apiResult = await relationshipRepo.deleteRelationship({
			clientRoleRelId: clientRoleRelId!,
		});
		if (apiResult.isSuccess) {
			setListLoading(true);
			getClient();
			message.success("Delete relationship success");
		} else {
			message.success("Delete Fail");
		}
		setListLoading(false);
	}

	useEffect(() => {
		getClient();

		return () => {
			setViewTitle("");
			setViewList([]);
			setListLoading(true);
		};
	}, []);

	return (
		<>
			<Layout>
				<Row className="dashboard_row">
					<Col xs={24} xl={6} className="dashboard_col" span={6} />
					<Col xs={24} xl={12} className="dashboard_col" span={12}>
						<Stack spacing={4}>
							<Flex>
								<Box p="4">
									<Title level={4}>
										{`${locationState.name}'s roles`}
									</Title>
								</Box>
								<Spacer />
								<Box p={4}>
									<Button
										backgroundColor={"red.400"}
										color={"white"}
										onClick={() => {
											deleteClient(
												locationState.clientId
											);
										}}
									>
										Delete {locationState.name}
									</Button>
								</Box>
							</Flex>
							<Skeleton active loading={_listLoading}>
								<Table
									dataSource={_viewList}
									columns={[
										{
											title: "Index",
											dataIndex: "index",
											key: "index",
										},
										{
											title: "Role Name",
											dataIndex: "name",
											key: "name",
										},
										{
											title: "Permission",
											dataIndex: "permission",
											key: "permission",
										},
										{
											title: "Created Date",
											dataIndex: "createdDateTime",
											key: "createdDateTime",
										},
										{
											title: "Action",
											key: "action",
											render: (text, record) => (
												<Space size="middle">
													<Button
														backgroundColor={
															"red.400"
														}
														color={"white"}
														onClick={() => {
															console.log(record);
															deleteRelationship(
																record.clientRoleRelId ??
																	""
															);
														}}
													>
														Delete
													</Button>
												</Space>
											),
										},
									]}
								/>
							</Skeleton>
						</Stack>
					</Col>
					<Col xs={24} xl={12} className="dashboard_col" span={6} />
				</Row>
			</Layout>
		</>
	);
};
