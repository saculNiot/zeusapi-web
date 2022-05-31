import {
	FacebookOutlined,
	InstagramOutlined,
	TwitterOutlined,
	YoutubeOutlined,
} from "@ant-design/icons";
import {
	Box,
	chakra,
	Container,
	Link,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import codagenceWordLogo from "../../assets/logo/Codagence_main_logo.png";

const Logo = (props: any) => {
	return (
		<img
			style={{ width: "130px", height: "25px" }}
			src={codagenceWordLogo}
			alt="Codagence Logo"
		/>
	);
};

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function Footer() {
	return (
		<Box
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
		>
			<Container
				as={Stack}
				maxW={"6xl"}
				py={4}
				spacing={4}
				justify={"center"}
				align={"center"}
			>
				<Logo />
				<Stack direction={"row"} spacing={6}>
					<Link href={"#hero"} onClick={() => {}}>
						Home
					</Link>
					<Link
						href={"mailto:gohsyang@gmail.com"}
						onClick={() => {}}
					>
						Contact
					</Link>
					<Link
						href={
							"#"
						}
						onClick={() => {}}
					>
						Terms
					</Link>
					<Link
						href={
							"#"
						}
						onClick={() => {}}
					>
						Privacy
					</Link>
				</Stack>
			</Container>

			<Box
				borderTopWidth={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.700")}
			>
				<Container
					as={Stack}
					maxW={"6xl"}
					py={4}
					direction={{ base: "column", md: "row" }}
					spacing={4}
					justify={{ base: "center", md: "space-between" }}
					align={{ base: "center", md: "center" }}
				>
					<Text>© 2022 Zeus API. All rights reserved</Text>
					<Stack direction={"row"} spacing={6}>
						<SocialButton label={"Facebook"} href={"#"}>
							<FacebookOutlined />
						</SocialButton>
						<SocialButton label={"Twitter"} href={"#"}>
							<TwitterOutlined />
						</SocialButton>
						<SocialButton label={"Instagram"} href={"#"}>
							<InstagramOutlined />
						</SocialButton>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}
