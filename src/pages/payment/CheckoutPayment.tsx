import React, { useEffect, useState } from "react";
import "./CheckoutPayment.less";
import { useHistory, useLocation } from "react-router-dom";

import { RoutePath } from "../../utils/routePath";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Space } from "antd";

interface CheckoutPaymentProps {}

export const CheckoutPayment: React.FC<CheckoutPaymentProps> = ({}) => {
	const location = useLocation();

	const history = useHistory();

	const [checkOutStatus, setCheckoutStatus] = useState<any>();

	const onFinish = async () => {
		setLoading(true);

		history.replace(RoutePath.home);

		setLoading(false);
	};

	// Is loading flag
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		// Get the parameter value from url
		const data: any = new URLSearchParams(location.search).get("status");
		setCheckoutStatus(data);
	}, []);

	return (
		<Box textAlign="center" py={10} px={6}>
			<Space direction="vertical">
				{checkOutStatus === "success" ? (
					<CheckCircleIcon boxSize={"50px"} color={"green.500"} />
				) : (
					<Box display="inline-block">
						<Flex
							flexDirection="column"
							justifyContent="center"
							alignItems="center"
							bg={"red.500"}
							rounded={"50px"}
							w={"55px"}
							h={"55px"}
							textAlign="center"
						>
							<CloseIcon boxSize={"20px"} color={"white"} />
						</Flex>
					</Box>
				)}
				<Heading as="h2" size="xl" mt={6} mb={2}>
					Payment {checkOutStatus}
				</Heading>
				<Text color={"gray.500"}>Please return to the main page.</Text>
				<Button
					display={{ base: "none", md: "inline-flex" }}
					fontSize={"sm"}
					fontWeight={600}
					color={"white"}
					bg={"#270949"}
					_hover={{
						bg: "#4654A3",
					}}
					onClick={() => {
						history.replace(RoutePath.default);
					}}
				>
					Home
				</Button>
			</Space>
		</Box>
	);
};
