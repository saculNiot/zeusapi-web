import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
} from "@chakra-ui/react";
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
} from "@chakra-ui/icons";
import codagenceWordLogo from "../../assets/logo/Codagence_main_logo.png";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { RoutePath } from "../../utils/routePath";
import { useHistory } from "react-router-dom";
import {Suffix_Nav} from "../../utils/components"

export default function Nav() {
	const { isOpen, onToggle } = useDisclosure();
	// Get current sign in User
	const user = useContext(AuthContext);
	let history = useHistory();

	return (
		<Box>
			<Flex
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}
			>
				<Flex
					flex={{ base: 1, md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}
				>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? (
								<CloseIcon w={3} h={3} />
							) : (
								<HamburgerIcon w={5} h={5} />
							)
						}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justify={{ base: "center", md: "start" }}
				>
					<img
						style={{ width: "130px", height: "25px" }}
						src={codagenceWordLogo}
						alt="Codagence Logo"
					/>

				</Flex>

				{user === null ? (
					<Stack
						flex={{ base: 1, md: 0 }}
						justify={"flex-end"}
						direction={"row"}
						spacing={6}
					>
						<Button
							as={"a"}
							fontSize={"sm"}
							fontWeight={400}
							variant={"link"}
							onClick={() => {
								// Refresh the page if user have logged in, else proceed to login page
								user === null
									? history.push(RoutePath.login)
									: history.replace(RoutePath.home);
							}}
						>
							Sign In
						</Button>
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
								// Refresh the page if user have logged in, else proceed to registration page
								user === null
									? history.push(RoutePath.register)
									: history.replace(RoutePath.home);
							}}
						>
							Sign Up
						</Button>
					</Stack>
				) : (
					<Stack
						flex={{ base: 1, md: 0 }}
						justify={"flex-end"}
						direction={"row"}
						spacing={6}
					>
						{DesktopNav(Suffix_Nav, false, user, history)}
					</Stack>
				)}
			</Flex>
		</Box>
	);
}

const DesktopNav = (
	NAV_ITEMS: NavItem[],
	isPrefix: boolean,
	user: any,
	history: any
) => {
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");
	const popoverContentBgColor = useColorModeValue("white", "gray.800");

	return (
		<Stack direction={"row"} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							{isPrefix ? (
								<Link
									p={2}
									onClick={() =>
										navItem.onClick(user, history)
									}
									fontSize={"sm"}
									fontWeight={500}
									color={linkColor}
									_hover={{
										textDecoration: "none",
										color: linkHoverColor,
									}}
								>
									{navItem.label}
								</Link>
							) : (
								<Button
									as={"a"}
									fontSize={"sm"}
									fontWeight={600}
									color={"white"}
									bg={"pink.400"}
									_hover={{
										bg: "pink.300",
									}}
								>
									{navItem.label}
								</Button>
							)}
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={"xl"}
								bg={popoverContentBgColor}
								p={4}
								rounded={"xl"}
								minW={"sm"}
							>
								<Stack>
									{navItem.children.map((child) =>
										DesktopSubNav(
											{ ...child },
											user,
											history
										)
									)}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = (
	{ label, onClick, subLabel }: NavItem,
	user: any,
	history: any
) => {
	return (
		<Link
			onClick={() => onClick(user, history)}
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
		>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text
						transition={"all .3s ease"}
						_groupHover={{ color: "pink.400" }}
						fontWeight={500}
					>
						{label}
					</Text>
					<Text fontSize={"sm"}>{subLabel}</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{
						opacity: "100%",
						transform: "translateX(0)",
					}}
					justify={"flex-end"}
					align={"center"}
					flex={1}
				>
					<Icon
						color={"pink.400"}
						w={5}
						h={5}
						as={ChevronRightIcon}
					/>
				</Flex>
			</Stack>
		</Link>
	);
};


interface NavItem {
	key?: number;
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	onClick: (user: any, history: any) => void;
}


