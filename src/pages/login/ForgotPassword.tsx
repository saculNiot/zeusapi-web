import React, { ReactElement, useState } from "react";
import _ from "lodash";
import { Layout, Row, Col, Form, Card } from "antd";
import "./ForgotPassword.less";
import { BackHeader, EmailField, FormButton } from "../../utils/components";
import { FirebaseServices } from "../../utils/firebaseServices";
import { useHistory } from "react-router-dom";
import { RoutePath } from "../../utils/routePath";
import {
	Button,
	FormControl,
	Flex,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

export const ForgotPassword: React.FC<any> = () => {
	let history = useHistory();

	const [isLoading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);
		let firebaseResult = await FirebaseServices.resetPassword(
			values["email"]
		);

		if (firebaseResult.isSuccess) {
			// Go to login page
			history.push(RoutePath.login);
			setLoading(false);
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
				<Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
					Forgot your password?
				</Heading>
				<Text
					fontSize={{ base: "sm", sm: "md" }}
					color={useColorModeValue("gray.800", "gray.400")}
				>
					You&apos;ll get an email with a reset link
				</Text>
				<Form
					name="forgot_password"
					className="forgot_password_form"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<EmailField />

					<Stack spacing={6}>
						<Form.Item>
							<FormButton
								title="Request Password Reset"
								isLoading={isLoading}
							/>
						</Form.Item>
					</Stack>
				</Form>
			</Stack>
		</Flex>
	);
};
