import React, { forwardRef, useCallback, useContext } from "react";
import {
	Button,
	Card,
	Col,
	Form,
	FormInstance,
	Input,
	PageHeader,
	Row,
	Space,
	Spin,
} from "antd";
import { useHistory } from "react-router-dom";
import Title from "antd/lib/typography/Title";
import "./components.less";
import { AuthContext } from "./AuthContext";
import { RoutePath } from "./routePath";
import { PaymentRepo } from "../services/api/repositories/payment_repo";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";
import { LocalStorage } from "./localStorage";
import { Response } from "../services/response";
import { FirebaseServices } from "./firebaseServices";
import {
	Box,
	FormLabel,
	GridItem,
	Heading,
	SimpleGrid,
	Stack,
	useColorModeValue,
	Button as ChakraButton,
	Text,
	Spinner,
} from "@chakra-ui/react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface ComponentProps {
	title?: string;
	isLoading?: boolean; // To identify if the component is in loading state
	enabled?: boolean; // To identify if the component is enabled or some field of the component is enabled
}

export const BackHeader: React.FC<ComponentProps> = ({ title }) => {
	let history = useHistory();
	function goBack() {
		// Navigate to previous page
		history.goBack();
	}
	return (
		<PageHeader
			className="site-page-header"
			ghost={false}
			onBack={() => goBack()}
			title={title}
		/>
	);
};

export const EmailField: React.FC<ComponentProps> = ({}) => {
	return (
		<>
			<FormLabel>Email</FormLabel>{" "}
			<Form.Item
				name="email"
				rules={[
					{
						type: "email",
						message: "The input is not valid E-mail!",
					},
					{
						required: true,
						message: "Please input your E-mail!",
					},
				]}
			>
				<Input type="email" style={{ width: "100%" }} />
			</Form.Item>
		</>
	);
};

export const PasswordField: React.FC<ComponentProps> = ({ enabled }) => {
	//If true, then the min 6 validator is enabled
	return (
		<>
			<FormLabel>Password</FormLabel>
			<Form.Item
				name="password"
				rules={
					enabled
						? [
								{
									required: true,
									message: "Please input your password!",
								},
								{
									min: 6,
									message:
										"Password must be minimum 6 characters.",
								},
						  ]
						: [
								{
									required: true,
									message: "Please input your password!",
								},
						  ]
				}
				hasFeedback
			>
				<Input.Password style={{ width: "100%" }} />
			</Form.Item>
		</>
	);
};

export const ConfirmPasswordField: React.FC<ComponentProps> = ({}) => {
	return (
		<>
			<FormLabel>Confirm Password</FormLabel>
			<Form.Item
				name="confirm"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{
						required: true,
						message: "Please confirm your password!",
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error(
									"The two passwords that you entered do not match!"
								)
							);
						},
					}),
				]}
			>
				<Input.Password style={{ width: "100%" }} />
			</Form.Item>
		</>
	);
};

// Form Button is without the form.item
export const FormButton: React.FC<ComponentProps> = ({ title, isLoading }) => {
	return (
		<Button
			htmlType="submit"
			shape="round"
			size="large"
			block={true}
			loading={isLoading}
		>
			{title}
		</Button>
	);
};
interface PricingProps {
	active?: string; // The pricing tier that the user currently at
}
// Pricing cards
export const PricingCards: React.FC<PricingProps> = ({ active }) => {
	let paymentRepo = new PaymentRepo();

	let history = useHistory();

	// Get current sign in User
	const user = useContext(AuthContext);

	const [isBtnLoading, setBtnLoading] = useState(false);

	const colorActive = {
		border: "2px solid #000000",
		backgroundColor: "#D3D3D3",
	};
	const color = {
		backgroundColor: "#fff",
	};

	const checkIfActiveColor = (key: string) => {
		if (active === undefined) {
			return color;
		} else {
			if (active) return key === active ? colorActive : color;
		}
	};

	const buttonActive = {
		disabled: true,
	};

	const button = {
		disabled: false,
	};

	const checkIfActiveBtn = (key: string) => {
		if (active === undefined) {
			return button;
		} else {
			if (active) return key === active ? buttonActive : button;
		}
	};

	const checkIfActiveBtnText = (key: string) => {
		if (active === undefined) {
			return "Select";
		} else {
			if (active) return key === active ? "Currently Selected" : "Select";
		}
	};

	const productList = [
		{
			id: "001", // Free plan has no stripe product id
			key: "free",
			name: "Free",
			description: "No cards required",
			secondaryDescription: "",
			price: 0,
			priceTag: "$0 USD/mo",
			btnText: "Select",
			features: [
				"Max 5 users assignation per file",
				"Max 5 files created",
				"Max 3 reports per file",
				"Max 5 shared files",
			],
		},
		{
			id: "prod_Kskj6UFUeFljfo",
			key: "pro",
			name: "Pro",
			description:
				"More power for small teams who want better collaboration",
			secondaryDescription: "All the goodness of Free Tier, and:",
			price: 5,
			priceTag: "$5 USD/mo",
			btnText: "Select",
			features: [
				"Max 15 users assignation per file",
				"Max 50 files created",
				"Max 10 reports per file",
				"Max 20 shared files",
			],
		},
		{
			id: "prod_KuOG0aN13C29yi",
			key: "enterprise",
			name: "Enterprise",
			description:
				"All the flexibility to meet your regulatory requirements and all the power to match your growth",
			secondaryDescription: "All the greatness of Pro, and:",
			price: 15,
			priceTag: "$15 USD/mo",
			btnText: "Select",
			features: [
				"Max 30 users assignation per file",
				"Max 100 files created",
				"Unlimited reports per file",
				"Unlimited shared files",
			],
		},
	];

	const navigate = async (product: { id: string; key: string }) => {
		setBtnLoading(true);
		if (user === null) {
			// Proceed to login page
			history.push(RoutePath.login);
		} else {
			// Go to email verification page if email not verified
			if (!user?.emailVerified) {
				history.push(RoutePath.email_verification);
			} else {
				// Call api to get the payment session url
				let apiResult = null;
				let currentPackagePlan = await LocalStorage.getPackagePlan();

				// Go to billing page if the user wants to upgrade or downgrade the plan
				if (
					product.key !== currentPackagePlan &&
					currentPackagePlan !== "free"
				) {
					let userId = await LocalStorage.getUserID();
					let email = await LocalStorage.getEmail();

					apiResult = await paymentRepo.getCustomerPortalSessionUrl({
						userId: userId!,
						email: email!,
					});
				}
				// Else go to checkout page
				else {
					apiResult = await paymentRepo.getCheckoutSessionUrl({
						userId: "userId",
					});
				}

				if (apiResult.isSuccess) {
					// Proceed to checkout page if seesion url is retreived
					// Replace the history
					window.location.replace(apiResult.data[0].sessionUrl);
				} else {
					alert(apiResult.message);
				}
			}
		}
		setBtnLoading(false);
	};
	return (
		<div>
			<Row className="pricing_row">
				{productList.map((productList) => (
					<Col xs={24} xl={8} className="pricing_col" span={8}>
						<Card
							className="pricing_content"
							style={checkIfActiveColor(productList.key)}
						>
							<div className="pricing_content_title">
								<Title className="site_desc" level={3}>
									{productList.name}
								</Title>
								<p> {productList.description}</p>
							</div>
							<div className="pricing_content_price">
								<Title className="site_desc" level={3}>
									{productList.priceTag}
								</Title>
							</div>
							<div className="pricing_content_nav">
								<Space direction="vertical">
									{isBtnLoading ? (
										<Spin size="large" />
									) : (
										<Button
											type="primary"
											size="large"
											ghost
											onClick={() =>
												navigate(productList)
											}
											{...checkIfActiveBtn(
												productList.key
											)}
										>
											{checkIfActiveBtnText(
												productList.key
											)}
										</Button>
									)}
									<Title className="site_desc" level={5}>
										{productList.secondaryDescription}
									</Title>
								</Space>
							</div>
							<div className="pricing_content_features">
								<Space direction="vertical">
									{productList.features.map((features) => (
										<p>{features}</p>
									))}
								</Space>
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

interface PhoneNumInputProps {
	initialValue?: any;
}

export const FormPhoneInput: React.FC<PhoneNumInputProps> = ({
	initialValue,
}) => {
	const [phoneNum, setPhoneNum] = useState<any>();

	return (
		<>
			<FormLabel>Phone Number</FormLabel>
			<Form.Item
				name="phone_number"
				rules={[
					{
						required: true,
						message: "Please input your phone number!",
					},
				]}
			>
				<PhoneInput
					international
					defaultCountry="MY"
					countryCallingCodeEditable={false}
					value={phoneNum}
					onChange={(value) => setPhoneNum(value)}
				/>
			</Form.Item>
		</>
	);
};

interface NavItem {
	key?: number;
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	onClick: (user: any, history: any) => void;
}

export const Suffix_Nav: Array<NavItem> = [
	{
		label: "Your Account",
		onClick: () => {}, // To fulfill the interface
		children: [
			{
				key: 0,
				label: "Billing",
				subLabel: "View your bill and usage analytic",
				onClick: async () => {
					// Call api to get the payment session url
					let userId = await LocalStorage.getUserID();
					let email = await LocalStorage.getEmail();

					let paymentRepo = new PaymentRepo();
					let apiResult =
						await paymentRepo.getCustomerPortalSessionUrl({
							userId: userId!,
							email: email!,
						});

					if (apiResult.isSuccess) {
						// Proceed to checkout page if seesion url is retreived
						// Replace the history
						window.location.replace(apiResult.data[0].sessionUrl);
					} else {
						alert(apiResult.message);
					}
				},
			},
			{
				key: 1,
				label: "Profile",
				subLabel: "View and update your profile",
				onClick: (user: any, history: any) => {
					history.push(RoutePath.user_profile);
				},
			},
			{
				key: 2,
				label: "Reset Password",
				subLabel: "Change your password here",
				onClick: (user: any, history: any) => {
					history.push(RoutePath.reset_password);
				},
			},
			{
				key: 3,
				label: "Log Out",
				subLabel: "See ya",
				onClick: async (user: any, history: any) => {
					await FirebaseServices.signOut();
					// Clear local storage
					await LocalStorage.resetStorage();
					history.replace(RoutePath.default);
				},
			},
		],
	},
];

interface FillFormProps {
	title: string;
	subtitle: string;
	formComponents: any;
	initialValue: any;
	form: FormInstance<any>;
	onSubmit: (values: any) => Promise<void>;
	isFormLoading: boolean;
}
export const FillForm: React.FC<FillFormProps> = ({
	title,
	subtitle,
	formComponents,
	initialValue,
	form,
	onSubmit,
	isFormLoading,
}) => {
	const [isButtonLoading, setButtonLoading] = useState<boolean>(false);

	const onFinish = async (values: any) => {
		setButtonLoading(true);
		await onSubmit(values);
		setButtonLoading(false);
	};
	return (
		<Form
			onFinish={onFinish}
			autoComplete="off"
			initialValues={initialValue}
			form={form}
		>
			<Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
				<Box>
					<SimpleGrid
						display={{ base: "initial", md: "grid" }}
						columns={{ md: 3 }}
						spacing={{ md: 6 }}
					>
						<GridItem colSpan={{ md: 1 }}>
							<Box px={[4, 0]}>
								<Heading
									fontSize="lg"
									fontWeight="md"
									lineHeight="6"
								>
									{title}
								</Heading>
								<Text
									mt={1}
									fontSize="sm"
									color={useColorModeValue(
										"gray.600",
										"gray.400"
									)}
								>
									{subtitle}
								</Text>
							</Box>
						</GridItem>
						<GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
							<Stack
								px={4}
								py={5}
								bg={useColorModeValue("white", "gray.700")}
								spacing={4}
								p={{ sm: 6 }}
								style={{ minHeight: "76vh" }}
							>
								{isFormLoading ? (
									<Spinner textAlign={"center"} />
								) : (
									formComponents
								)}
							</Stack>
							<Row style={{ marginTop: "10px" }}>
								<Col span={18} />
								<Col span={6}>
									{" "}
									<Form.Item>
										<FormButton
											isLoading={isButtonLoading}
											title="Save"
										/>
									</Form.Item>
								</Col>
							</Row>
						</GridItem>
					</SimpleGrid>
				</Box>
			</Box>
		</Form>
	);
};
