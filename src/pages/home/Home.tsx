import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import {
	Button,
	Layout,
	Menu,
	Typography,
	Row,
	Col,
	Space,
	Divider,
	Card,
} from "antd";
import "./Home.less";
import homeHeaderImg from "../../assets/illustrations/home_header.png";
import use_case1 from "../../assets/illustrations/usecase_dashboard.png";
import use_case2 from "../../assets/illustrations/usecase_visualization_collection.png";
import use_case3 from "../../assets/illustrations/usecase_internal_sharing.png";
import use_case4 from "../../assets/illustrations/usecase_presentation.png";
import { RoutePath } from "../../utils/routePath";
import { AuthContext } from "../../utils/AuthContext";
import { LocalStorage } from "../../utils/localStorage";
import { FirebaseServices } from "../../utils/firebaseServices";
import { PricingCards } from "../../utils/components";
import { PaymentRepo } from "../../services/api/repositories/payment_repo";
import { UserRepo } from "../../services/api/repositories/user_repo";
import { User } from "../../services/api/models/user_model";
import Meta from "antd/lib/card/Meta";
import Nav from "./Nav";
import Hero from "./Hero";
import { Heading } from "@chakra-ui/react";
import Pricing from "./Pricing";
import Footer from "./Footer";
import NewsLetter from "./NewsLetter";
import Features from "./Features";

export const Home: React.FC<any> = () => {
	let userRepo = new UserRepo();
	let user = useContext(AuthContext);

	useEffect(() => {
		async function initState() {
			let userId = await LocalStorage.getUserID();
			let apiResult = await userRepo.getUserById({
				userId: userId!,
			});
			if (apiResult.isSuccess) {
				let usermodel: User = apiResult.data[0];
				await LocalStorage.setEmail(usermodel?.email ?? "");
				await LocalStorage.setNickName(usermodel?.username ?? "");
				await LocalStorage.setEmailVerified(
					`${user?.emailVerified}` ?? ""
				);
				await LocalStorage.setPackagePlan(
					usermodel?.packagePlan ?? "free"
				);
			}
		}

		initState();
	}, []);

	return (
		<>
			<Nav />
			<div style={{ backgroundColor: "GhostWhite" }}>
				<Hero />
			</div>
			{/* Usee case */}
			<div id="features" className="content_3">
				<Heading fontSize={"3xl"}>Features</Heading>
				<Row className="use_case_row">
					{usecaseList.map((usecaseList) => (
						<Col xs={24} xl={6} className="use_case_col" span={6}>
							<Card
								cover={
									<img
										alt={usecaseList.title}
										src={usecaseList.image}
									/>
								}
							>
								<Meta
									style={{ height: "130px" }}
									title={usecaseList.title}
									description={usecaseList.desc}
								/>
							</Card>
						</Col>
					))}
				</Row>
			</div>
			{/* Pricing */}
			<div style={{ backgroundColor: "GhostWhite" }}>
				<Pricing />
			</div>
			{/* Newsletter */}
			<NewsLetter />
			{/* Footer */}
			<Footer />
		</>
	);
};

const usecaseList = [
	{
		image: use_case1,
		title: "Quick and Simple",
		desc: "Hard to add the add the access control featres into the system? Let us simplify the work.",
	},
	{
		image: use_case2,
		title: "Highly customizable ",
		desc: "The usage of Zeus API to restrict the access provides high flexibility to customize your own UI.",
	},
	{
		image: use_case3,
		title: "Fully Managed",
		desc: "Handle your the user access rights all in one dashboard.",
	},
	{
		image: use_case4,
		title: "Various usage scenarios",
		desc: "It can be used in the internal tools and the tiered pricing of your system.",
	},
];
