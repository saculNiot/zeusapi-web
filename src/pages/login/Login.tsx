import React, { useContext, useState } from "react";
import _ from "lodash";
import { Layout, Row, Col, Form, Checkbox, Card } from "antd";
import "./Login.less";
import { useHistory } from "react-router-dom";
import { FirebaseServices } from "../../utils/firebaseServices";
import { AuthContext } from "../../utils/AuthContext";
import {
	BackHeader,
	EmailField,
	FormButton,
	PasswordField,
} from "../../utils/components";
import { UserRepo } from "../../services/api/repositories/user_repo";
import { RoutePath } from "../../utils/routePath";
import { Encryption } from "../../utils/encryption";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

const formItemLayout = {
	labelCol: {
		xs: { span: 22 },
		sm: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 22 },
		sm: { span: 14 },
	},
};

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 22,
			offset: 0,
		},
		sm: {
			span: 14,
			offset: 6,
		},
	},
};

export const Login: React.FC<any> = () => {
	let userRepo = new UserRepo();

	let history = useHistory();

	// Get current sign in User
	const user = useContext(AuthContext);

	// Is loading flag
	const [isLoading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);

		let firebaseResult = await FirebaseServices.logIn(
			values["email"],
			values["password"]
		);
		if (firebaseResult.isSuccess) {
			let tokenResponse = await userRepo.createAccessToken({
				email: values["email"],
				password: values["password"],
			});

			if (tokenResponse.isSuccess) {
				let apiResult = await userRepo.saveUser({
					purpose: "login",
					userId: firebaseResult.data.uid,
					email: values["email"],
					password: Encryption.encrypt(values["password"]),
				});

				if (apiResult.isSuccess) {
					// Check if the user has verify the email
					if (firebaseResult.data?.emailVerified) {
						// Go to home
						alert("Log In success");
						history.replace(RoutePath.home);
					} else {
						// Go to email verification page
						history.replace(RoutePath.email_verification);
					}
				} else {
					alert(apiResult.message);
				}
			} else {
				alert(tokenResponse.message);
			}
		} else {
			alert(firebaseResult.message);
		}
		setLoading(false);
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
					<Heading fontSize={"4xl"}>Sign in to your account</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool{" "}
						<Link color={"blue.400"}>features</Link> ✌️
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<Form
							name="normal_login"
							className="login_form"
							initialValues={{ remember: true }}
							onFinish={onFinish}
						>
							<EmailField />
							<PasswordField />

							<Stack spacing={10}>
								<Stack
									direction={{ base: "column", sm: "row" }}
									align={"start"}
									justify={"space-between"}
								>
									<Form.Item
										name="remember"
										valuePropName="checked"
										noStyle
									>
										<Checkbox>Remember me</Checkbox>
									</Form.Item>
									<div>
										<Link
											className="login_form_forgot_pwd"
											href={RoutePath.forgot_password}
											color={"blue.400"}
											onClick={() => {}}
										>
											Forgot password
										</Link>
									</div>
								</Stack>
								<Form.Item>
									<FormButton
										title="Log In"
										isLoading={isLoading}
									/>
								</Form.Item>
								<Text align={"center"}>
									or{" "}
									<Link
										color={"blue.400"}
										onClick={() => {
											history.replace(RoutePath.register);
										}}
									>
										register now!
									</Link>
								</Text>
							</Stack>

							<Form.Item {...tailFormItemLayout}></Form.Item>
						</Form>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};
