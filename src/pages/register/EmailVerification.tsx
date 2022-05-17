import React, { useContext, useState } from "react";
import _ from "lodash";
import { Layout, Row, Col, Card, Form } from "antd";
import "./Register.less";
import "antd-country-phone-input/dist/index.css";
import { BackHeader, FormButton } from "../../utils/components";
import Title from "antd/lib/typography/Title";
import { FirebaseServices } from "../../utils/firebaseServices";
import { AuthContext } from "../../utils/AuthContext";
import { RoutePath } from "../../utils/routePath";
import { useHistory } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import {
	Flex,
	Heading,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

export const EmailVerification: React.FC<any> = () => {
	let history = useHistory();

	const time = new Date();
	time.setSeconds(time.getSeconds() + 60);

	const { seconds, start, restart } = useTimer({
		autoStart: false,
		expiryTimestamp: time,
		onExpire: () => {
			// Show the button on expiring time
			setBtn(true);
			// Reset the time to 60 seconds after the expiring time
			restart(time, false);
		},
	});

	// Get current sign in User
	const user = useContext(AuthContext);

	// Is loading flag
	const [isLoading, setLoading] = useState(false);

	const [isBtnEnabled, setBtn] = useState(true);

	const onFinish = async (values: any) => {
		setLoading(true);

		// If user not found, then proceed to log in page
		if (user) {
			//If the meail has verified, proceed to home page
			if (user?.emailVerified) history.replace(RoutePath.home);
			await FirebaseServices.sendEmailVerification(user);
			alert("Email verification has sent");
			// Start the timer
			setBtn(false);
			start();
		} else {
			history.replace(RoutePath.login);
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
					Email verification has sent to your mailbox.
				</Heading>
				<Text
					fontSize={{ base: "sm", sm: "md" }}
					color={useColorModeValue("gray.800", "gray.400")}
				>
					If not found, please check your junk mail.{" "}
				</Text>
				<Form
					name="register"
					className="register_form"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					{isBtnEnabled ? (
						<Form.Item>
							<FormButton
								title="Send Email Verification"
								isLoading={isLoading}
							/>
						</Form.Item>
					) : (
						<p>
							{" "}
							Please send again in {seconds} second if not found.
						</p>
					)}
				</Form>
			</Stack>
		</Flex>
	);
};
