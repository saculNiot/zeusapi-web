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
import { Box, Text, Flex, Link, Spacer, Stack } from "@chakra-ui/react";
import Title from "antd/lib/typography/Title";
import { RoutePath } from "../../utils/routePath";
import { AccessLogRepo } from "../../services/api/repositories/accesslog_repo";
import { AccessLog } from "../../services/api/models/accesslog_model";

export const AccessLogList: React.FC<any> = () => {
	let accessLogRepo = new AccessLogRepo();

	let location = useLocation();
	let history = useHistory();
	const locationState: any = location.state;

	// Handle the state of each option in Menu bar

	const [_viewTitle, setViewTitle] = useState<string>("Clients");

	const [_viewList, setViewList] = useState<Array<AccessLog>>([]);

	const [_listLoading, setListLoading] = useState<boolean>(true);

	async function getClient() {
		setViewList([]);
		let apiResult = await accessLogRepo.getAccessLog({
			history: history,
		});

		if (apiResult.isSuccess) {
			if (apiResult.data[0] !== undefined) {
				setViewList(
					apiResult.data.map((item: AccessLog, index: number) => {
						return {
							index: index + 1,
							key: item.requestId,
							client: item.client,
							role: item.role,
							relationship:
								item.relationship === null
									? "N/A"
									: item.relationship,
							api: item.api,
							createdDateTime: new Date(
								item.createdDateTime ?? ""
							).toLocaleString(),
						};
					})
				);
			}
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
									<Title level={4}>Access Log</Title>
								</Box>
								<Spacer />
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
											title: "Client ID",
											key: "client",
											render: (text, record) =>
												record.client !== null ? (
													<Space size="middle">
														<Link
															color="blue.400"
															onClick={() => {
																history.push({
																	pathname:
																		RoutePath.create_client,
																	state: {
																		clientId:
																			record.client,
																	},
																});
															}}
														>
															{record.client}
														</Link>
													</Space>
												) : (
													<Text>N/A</Text>
												),
										},

										{
											title: "Role ID",
											key: "role",
											render: (text, record) =>
												record.role !== null ? (
													<Space size="middle">
														<Link
															color="blue.400"
															onClick={() => {
																history.push({
																	pathname:
																		RoutePath.create_role,
																	state: {
																		roleId: record.role,
																	},
																});
															}}
														>
															{record.role}
														</Link>
													</Space>
												) : (
													<Text>N/A</Text>
												),
										},
										{
											title: "Relationship ID",
											dataIndex: "relationship",
											key: "relationship",
										},
										{
											title: "API name",
											dataIndex: "api",
											key: "api",
										},
										{
											title: "Created Date",
											dataIndex: "createdDateTime",
											key: "createdDateTime",
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
