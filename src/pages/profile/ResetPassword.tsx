import React, { ReactElement, useState } from "react";
import _ from "lodash";
import { Layout, Row, Col, Form, Card } from "antd";
import "./ResetPassword.less";
import { BackHeader, EmailField, FormButton } from "../../utils/components";
import { FirebaseServices } from "../../utils/firebaseServices";
import { useHistory } from "react-router-dom";
import { RoutePath } from "../../utils/routePath";
import { LocalStorage } from "../../utils/localStorage";
import {
	Flex,
	Heading,
	Stack,
	Text,
	useColorModeValue,
  } from '@chakra-ui/react';

export const ResetPassword: React.FC<any> = () => {
	let history = useHistory();

	const [isLoading, setLoading] = useState(false);

	const onFinish = async (values: any) => {

		const email = await LocalStorage.getEmail();
		setLoading(true);
		let firebaseResult = await FirebaseServices.resetPassword(email ?? "");

		if (firebaseResult.isSuccess) {
			// Go to login page
			alert(`Sent password reset email to ${email}`);
			history.replace(RoutePath.home);
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
					Email change request has sent to your mailbox.
				</Heading>
				<Text
					fontSize={{ base: "sm", sm: "md" }}
					color={useColorModeValue("gray.800", "gray.400")}
				>
					If not found, please check your junk mail.{" "}
				</Text>
				<Form
								name="reset_password"
								className="reset_password_form"
								initialValues={{ remember: true }}
								onFinish={onFinish}
							>
								<Form.Item>
									<FormButton
										title="Send Password Reset Email"
										isLoading={isLoading}
									/>
								</Form.Item>
							</Form>
			</Stack>
		</Flex>
	);
};
