import {
	Box,
	Center,
	Text,
	Stack,
	List,
	ListItem,
	ListIcon,
	Button,
	useColorModeValue,
	VStack,
	Heading,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { PaymentRepo } from "../../services/api/repositories/payment_repo";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { RoutePath } from "../../utils/routePath";
import { LocalStorage } from "../../utils/localStorage";

export default function Pricing() {
	let paymentRepo = new PaymentRepo();

	let history = useHistory();
	const [_isCheckoutLoading, setCheckoutLoading] = useState<boolean>(false);

	// Get current sign in User
	const user = useContext(AuthContext);
	const checkOut = async (productId: string) => {
		if (!user) {
			// Proceed to login page
			history.push(RoutePath.login);
		} else {
			// Go to email verification page if email not verified
			if (!user?.emailVerified) {
				history.push(RoutePath.email_verification);
			} else {
				let userId = await LocalStorage.getUserID();
				// Call api to get the payment session url
				let apiResult = await paymentRepo.getCheckoutSessionUrl({
					userId: userId ?? "",
					productId: productId,
				});
				if (apiResult.isSuccess) {
					// Proceed to checkout page if seesion url is retreived
					// Replace the history
					window.location.replace(apiResult.data[0].sessionUrl);

				} else {

					alert(apiResult.message);
				}
			}
			setCheckoutLoading(false);
		}
	};
	return (
		<Box py={12} id="pricing">
			<VStack spacing={2} textAlign="center">
				<Heading as="h1" fontSize="4xl">
					Pay as you go
				</Heading>
				<Text fontSize="lg" color={"gray.500"}>
					Only pay for what you have used. Cancel at anytime.
				</Text>
			</VStack>
			<Center py={6}>
				<Box
					maxW={"330px"}
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					boxShadow={"2xl"}
					rounded={"md"}
					overflow={"hidden"}
				>
					<Stack
						textAlign={"center"}
						p={6}
						color={useColorModeValue("gray.800", "white")}
						align={"center"}
					>
						<Text
							fontSize={"sm"}
							fontWeight={500}
							bg={useColorModeValue("pink.50", "pink.900")}
							p={2}
							px={3}
							color={"pink.500"}
							rounded={"full"}
						>
							Starting from
						</Text>
						<Stack
							direction={"row"}
							align={"center"}
							justify={"center"}
						>
							{" "}
							<Text fontSize={"3xl"}>$</Text>
							<Text fontSize={"6xl"} fontWeight={800}>
								0
							</Text>
							<Text color={"gray.500"}>/month</Text>
						</Stack>
					</Stack>

					<Box
						bg={useColorModeValue("gray.50", "gray.900")}
						px={6}
						py={10}
					>
						<List spacing={3}>
							<ListItem>
								<ListIcon as={CheckIcon} color="pink.400" />
								Free 100 MB monthly reads
							</ListItem>
							<ListItem>
								<ListIcon as={CheckIcon} color="pink.400" />
								$0.50/GB-month total reads
							</ListItem>
							<ListItem>
								<ListIcon as={CheckIcon} color="pink.400" />
								Unlimited dashboard created
							</ListItem>
							<ListItem>
								<ListIcon as={CheckIcon} color="pink.400" />
								Unlimited charts
							</ListItem>
							<ListItem>
								<ListIcon as={CheckIcon} color="pink.400" />
								No watermark (Limited time only)
							</ListItem>
						</List>

						<Button
							mt={10}
							w={"full"}
							bg={"blue.400"}
							color={"white"}
							rounded={"xl"}
							boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
							_hover={{
								bg: "#4654A3",
							}}
							_focus={{
								bg: "#4654A3",
							}}
							isLoading={_isCheckoutLoading}
							loadingText="Checking"
							colorScheme="teal"
							variant="outline"
							onClick={() => {
								setCheckoutLoading(true);
								checkOut("prod_LWS6T2labW3J9p");
							}}
						>
							Start at Free
						</Button>
					</Box>
				</Box>
			</Center>
		</Box>
	);
}
