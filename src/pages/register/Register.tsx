import React, { useState } from "react";
import _ from "lodash";
import { Layout, Row, Col, Form, Checkbox, Input, Card, Radio } from "antd";
import "./Register.less";
import { useHistory } from "react-router-dom";
import "antd-country-phone-input/dist/index.css";
import { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/en/world.json";
import { FirebaseServices } from "../../utils/firebaseServices";
import { UserRepo } from "../../services/api/repositories/user_repo";
import {
	BackHeader,
	ConfirmPasswordField,
	EmailField,
	FormButton,
	FormPhoneInput,
	PasswordField,
} from "../../utils/components";
import { Encryption } from "../../utils/encryption";
import { RoutePath } from "../../utils/routePath";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

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

export const Register: React.FC<any> = () => {
	let userRepo = new UserRepo();

	let history = useHistory();

	// Is loading flag
	const [isLoading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);


		let firebaseResult = await FirebaseServices.createAccount(
			values["email"],
			values["password"]
		);

		if (firebaseResult.isSuccess) {

			let apiResult = await userRepo.saveUser({
				purpose: "new_user",
				userId: firebaseResult.data.uid,
				email: values["email"],
				password: Encryption.encrypt(values["password"]),
				username: values["first_name"] + values["last_name"],
				firstName: values["first_name"],
				lastName: values["last_name"],
				phoneNo: formatPhoneNumberIntl(values["phone_number"]),
				acctType: values["account_type"],
				orgName: values["organisation_name"],
				packagePlan: "free",
			});

			if (apiResult.isSuccess) {
				alert("Email verification has sent to your mail box.");

				history.replace(RoutePath.product_choices);
				setLoading(false);
			} else {

				alert(apiResult.message);
				setLoading(false);
			}
		} else {

			alert(firebaseResult.message);
			setLoading(false);
		}
	};

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool features ✌️
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<ConfigProvider locale={en}>
							<Form
								name="register"
								className="register_form"
								initialValues={{ remember: true }}
								onFinish={onFinish}
							>
								<EmailField />

								<PasswordField />

								<ConfirmPasswordField />

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
												message:
													"Please choose your account type!",
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

								<Form.Item
									name="agreement"
									valuePropName="checked"
									rules={[
										{
											validator: (_, value) =>
												value
													? Promise.resolve()
													: Promise.reject(
															new Error(
																"Should accept agreement"
															)
													  ),
										},
									]}
								>
									<Checkbox>
										I have read the{" "}
										<a
											color={"blue.400"}
											href="https://codagence.notion.site/TERMS-AND-CONDITIONS-416ed24afab14050a68e2f0d80357f65"
											onClick={() => {

											}}
										>
											agreement
										</a>
									</Checkbox>
								</Form.Item>

								<Stack spacing={10} pt={2}>
									<Form.Item>
										<FormButton
											title="Register"
											isLoading={isLoading}
										/>
									</Form.Item>
								</Stack>
								<Stack pt={6}>
									<Text align={"center"}>
										Already a user?{" "}
										<Link
											color={"blue.400"}
											onClick={() =>
												history.push(RoutePath.login)
											}
										>
											Login
										</Link>
									</Text>
								</Stack>
							</Form>
						</ConfigProvider>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};
