import { Card, Col, Form, Input, Layout, Radio, Row } from "antd";
import { ConfigProvider } from "antd-country-phone-input";
import "antd-country-phone-input/dist/index.css";
import React, { useEffect, useState } from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { useHistory } from "react-router-dom";
import en from "world_countries_lists/data/en/world.json";
import { User } from "../../services/api/models/user_model";
import { UserRepo } from "../../services/api/repositories/user_repo";
import { BackHeader, FormButton, FormPhoneInput } from "../../utils/components";
import { LocalStorage } from "../../utils/localStorage";
import { RoutePath } from "../../utils/routePath";
import "./UserProfile.less";
import {
	Button,
	Flex,
	FormLabel,
	Heading,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

export const UserProfile: React.FC<any> = () => {
	let userRepo = new UserRepo();

	let history = useHistory();

	// Is btn loading flag
	const [isLoading, setLoading] = useState(false);

	// Is card loading flag
	const [isCardLoading, setCardLoading] = useState(true);

	const [userData, setUserData] = useState(new User({}));

	const [form] = Form.useForm();

	const onFinish = async (values: any) => {
		let userId = await LocalStorage.getUserID();
		setLoading(true);
		console.log(values["last_name"])

		let apiResult = await userRepo.saveUser({
			purpose: "update",
			userId: userId!,
			username: values["first_name"] + values["last_name"],
			firstName: values["first_name"],
			lastName: values["last_name"],
			phoneNo: formatPhoneNumberIntl(values["phone_number"]),
			acctType: values["account_type"],
			orgName: values["organisation_name"],
		});

		if (apiResult.isSuccess) {
			alert("Update Success");

			history.replace(RoutePath.home);
			setLoading(false);
		} else {
			alert(apiResult.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		async function fetchData() {
			let userId = await LocalStorage.getUserID();
			let apiResult = await userRepo.getUserById({
				userId: userId!,
			});
			if (apiResult.isSuccess) {
				setUserData(apiResult.data[0]);
			} else {
				alert(apiResult.message);
			}
			setCardLoading(false);
		}
		fetchData();
	}, []);

	useEffect(() => {
		form.resetFields();
	}, [userData]);

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack
				spacing={4}
				w={"full"}
				maxW={"md"}
				bg={useColorModeValue("white", "gray.700")}
				rounded={"xl"}
				boxShadow={"lg"}
				p={6}
				my={12}
			>
				<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
					User Profile Edit
				</Heading>
				<Form
					name="register"
					className="user_profile_form"
					form={form}
					initialValues={{
						first_name: userData.firstName ?? "",
						last_name: userData.lastName ?? "",
						phone_number: userData.phoneNo ?? "",
						account_type: userData.acctType ?? "",
						organisation_name: userData.orgName ?? "",
					}}
					onFinish={onFinish}
				>
					<Form.Item style={{ marginBottom: 0 }}>
						<Form.Item
							name="first_name"
							rules={[{ required: true }]}
							style={{
								display: "inline-block",
								width: "calc(50% - 8px)",
							}}
						>
							<Input placeholder="First Name" />
						</Form.Item>
						<Form.Item
							name="last_name"
							rules={[{ required: true }]}
							style={{
								display: "inline-block",
								width: "calc(50% - 8px)",
								margin: "0 8px",
							}}
						>
							<Input placeholder="Last Name" />
						</Form.Item>
					</Form.Item>

					<FormPhoneInput />

					<>
						<FormLabel>Account Type</FormLabel>
						<Form.Item
							name="account_type"
							rules={[
								{
									required: true,
									message: "Please choose your account type!",
								},
							]}
						>
							<Radio.Group>
								<Radio.Button value="institute">
									Institute
								</Radio.Button>
								<Radio.Button value="company">
									Company
								</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</>
					<>
						<FormLabel>Organisation Name</FormLabel>
						<Form.Item
							name="organisation_name"
							tooltip="Please input your Company/Institution name"
							rules={[
								{
									required: true,
									message:
										"Please input your Company/Institution name!",
								},
							]}
						>
							<Input />
						</Form.Item>
					</>
					<Form.Item>
						<FormButton title="Save" isLoading={isLoading} />
					</Form.Item>
				</Form>
			</Stack>
		</Flex>
	);
};
