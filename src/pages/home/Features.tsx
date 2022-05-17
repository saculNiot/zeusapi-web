import {
	Button,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import embed_dashboard_demo from "../../assets/features/embed_dashboard_demo.png";
import add_url_demo from "../../assets/features/add_url_demo.png";
import edit_data_demo from "../../assets/features/edit_data_demo.png";
import switch_param_demo from "../../assets/features/switch_param_demo.png";
import { SubTitle } from "chart.js";

export default function SplitScreen() {
	const content = [
		{
			title: "Webhook API",
			subtitle: "Enter webservices or API",
			desc: "Enter the API which will return the data going to be visualised.",
			img: add_url_demo,
			highlight: "blue.400",
		},
		{
			title: "Dashboard Editor",
			subtitle: "Edit Charts and Graphs",
			desc: "Edit and arrange the charts that are going to insert in dashboard.",
			img: edit_data_demo,
			highlight: "pink.400",
		},
		{
			title: "Production",
			subtitle: "Embed the analytic dashboard",
			desc: "Embed the dashboard you have designed into your site.",
			img: embed_dashboard_demo,
			highlight: "red.400",
		},
		{
			title: "Flexible dashboard",
			subtitle: "Change the parameter to show different results",
			desc: "Different from Tableau or Power BI embedded dashboard, you can change the parameter in the URL to show different visualisation.",
			img: switch_param_demo,
			highlight: "purple.400",
		},
	];
	return (
		<div>
			{content.map(({ title, subtitle, desc, img, highlight }) => {
				return (
					<Stack
						minH={"70vh"}
						direction={{ base: "column", md: "row" }}
					>
						<Flex
							p={8}
							flex={1}
							align={"center"}
							justify={"center"}
						>
							<Stack spacing={6} w={"full"} maxW={"lg"}>
								<Heading
									fontSize={{
										base: "3xl",
										md: "4xl",
										lg: "5xl",
									}}
								>
									<Text
										as={"span"}
										position={"relative"}
										_after={{
											content: "''",
											width: "full",
											height: "10px",
											position: "absolute",
											bottom: 1,
											left: 0,
											bg: highlight,
											zIndex: -1,
										}}
									>
										{title}
									</Text>
									<br />{" "}
									<Text color={highlight} as={"span"}>
										{subtitle}
									</Text>{" "}
								</Heading>
								<Text
									fontSize={{ base: "md", lg: "lg" }}
									color={"gray.500"}
								>
									{desc}
								</Text>
							</Stack>
						</Flex>
						<Flex flex={1}>
							<Image
								alt={"Add Image Url"}
								objectFit={"scale-down"}
								src={img}
							/>
						</Flex>
					</Stack>
				);
			})}
		</div>
	);
}
