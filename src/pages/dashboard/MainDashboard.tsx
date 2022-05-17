import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import {
	Button,
	Layout,
	Menu,
	Typography,
	Row,
	Col,
	Space,
	Divider,
	Card,
	List,
	Avatar,
	message,
	Skeleton,
	Popconfirm,
	Spin,
	Tooltip,
} from "antd";
import "./MainDashboard.less";
import codagenceWordLogo from "../../assets/logo/Codagence_main_logo.png";
import { RoutePath } from "../../utils/routePath";
import { AuthContext } from "../../utils/AuthContext";
import { LocalStorage } from "../../utils/localStorage";
import { FirebaseServices } from "../../utils/firebaseServices";
import { PricingCards } from "../../utils/components";
import { PaymentRepo } from "../../services/api/repositories/payment_repo";
import { UserRepo } from "../../services/api/repositories/user_repo";
import { User } from "../../services/api/models/user_model";
import Meta from "antd/lib/card/Meta";
import {
	CopyOutlined,
	CopyTwoTone,
	DeleteOutlined,
	EditTwoTone,
	EyeInvisibleOutlined,
	HeartOutlined,
	HomeTwoTone,
	PlusCircleOutlined,
	ReconciliationOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { UserUrl } from "../../services/api/models/url_model";
import Nav from "./Nav";
import mixpanel from "mixpanel-browser";
import { Link, Button as ChakraButton, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Title from "antd/lib/typography/Title";

export const MainDashboard: React.FC<any> = () => {
	let userRepo = new UserRepo();

	let history = useHistory();

	// Get current sign in User
	const user = useContext(AuthContext);

	// Handle the state of each option in Menu bar

	const [_viewTitle, setViewTitle] = useState<string>("Clients");

	const [_urls, setUrls] = useState<Array<UserUrl>>([]);

	const [_listLoading, setListLoading] = useState<boolean>(true);

	// async function getUrls() {
	// 	let userId = await LocalStorage.getUserID();
	// 	let apiResult = await urlRepo.getAllUserUrlByUserId({
	// 		userId: userId!,
	// 	});

	// 	if (apiResult.isSuccess) {
	// 		if (apiResult.data.length > 0)
	// 			apiResult.data.forEach((element: UserUrl) => {
	// 				setUrls((prevState) => {
	// 					return [...prevState, element];
	// 				});
	// 			});
	// 	}
	// 	setListLoading(false);
	// }

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
		// getUrls();

		return () => {
			setViewTitle("")
			setUrls([]);
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
										history.push({
											pathname: RoutePath.fill_url,
										});
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
											pathname: RoutePath.fill_url,
										});
									}}
								>
									Add Relationship
								</ChakraButton>
							</Stack>

							<Stack direction="row" spacing={4}>
								<Tooltip placement="topLeft" title="View clients">
									<Button
										icon={
											<UserOutlined style={{color:"#1E90FF"}}/>
										}
										shape="round"
										size="large"
										onClick={() => {
											setViewTitle("Clients")
										}}
									></Button>
								</Tooltip>
								<Tooltip placement="topLeft" title="View Roles">
									<Button
										icon={<ReconciliationOutlined style={{color:"	#FFA500"}}/>}
										shape="round"
										size="large"
										onClick={() => {
											setViewTitle("Roles")
										}}
									></Button>
								</Tooltip>
								<Tooltip placement="topLeft" title="View Relationship">
									<Button
										icon={<HeartOutlined style={{color:"#BA55D3"}}/>}
										shape="round"
										size="large"
										onClick={() => {
											setViewTitle("Relationships")
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
								dataSource={_urls}
								renderItem={(item, index) => (
									<List.Item
										actions={[
											<Tooltip
												placement="topLeft"
												title="Copy graph iframe"
											>
												<Button
													shape="round"
													icon={
														<CopyTwoTone twoToneColor="#270949" />
													}
													size={"large"}
													onClick={async () => {}}
												/>
											</Tooltip>,
											<Popconfirm
												title="Are you sure you want to delete?"
												onCancel={() => {
													mixpanel.track(
														"Dashboard_Execute_Delete_Url_Click",
														{
															Confirmation:
																"Deletion Cancel",
														}
													);
												}}
												onConfirm={async () => {
													mixpanel.track(
														"Dashboard_Execute_Delete_Url_Click",
														{
															Confirmation:
																"Deletion Approved",
														}
													);

													// let apiResult =
													// 	await urlRepo.deleteUrl(
													// 		{
													// 			urlId: item.urlId!,
													// 		}
													// 	);

													// if (apiResult.isSuccess) {
													// 	setListLoading(true);
													// 	setUrls([]);
													// 	getUrls();
													// 	message.success(
													// 		"Delete success"
													// 	);
													// } else {
													// 	message.success(
													// 		"Delete Fail"
													// 	);
													// }
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
											avatar={
												<Avatar
													src={`https://picsum.photos/200/300?random=${index}`}
												/>
											}
											title={
												<Link
													onClick={() => {
														mixpanel.track(
															"Dashboard_View_Graph_Editor_Click"
														);
														history.push({
															pathname:
																RoutePath.graph_editor,
															state: {
																apiKey: item.apiKey,
															},
														});
													}}
												>
													{item.url}
												</Link>
											}
											description="Click the link to the editor"
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
