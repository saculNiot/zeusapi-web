import { LocalStorage } from "../../../utils/localStorage";
import { Networking } from "../../networking";
import { Response } from "../../response";
import { GetUserByIdResponse, User } from "../models/user_model";

export class UserRepo {
	networking = new Networking();

	async createAccessToken(props: {
		email: string;
		password: string;
	}): Promise<Response> {
		let headers = {
			"Content-Type": "application/json",
		};

		console.log({ email: props.email, password: props.password });

		let response = await this.networking.postData(
			"api/token/", // API choice is depends on the usage
			{ email: props.email, password: props.password },
			headers
		);

		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			await LocalStorage.setAccessToken(response.data.get("access"));
			return new Response(true, response.message, response.data);

			// If data is retrieved and the data is empty, then return
		} else if (
			response.isSuccess &&
			response.message === "No records found"
		) {
			return new Response(true, "No records found", "");

			// If http method is timeout or being halt, then return
		} else if (!response.isSuccess) {
			return new Response(false, response.message, "");
		} else {
			return new Response(false, response.message, response.data);
		}
	}

	async getUserById(value?: { userId: string }): Promise<Response> {
		const path = `userId=${value?.userId}`;
		let headers = {
			"Authorization": `Bearer ${await LocalStorage.getAccessToken()}`,
		};
		let response = await this.networking.getData(
			`get_user_by_id?${path}`,
			headers
		);
		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			let getUserByUserIdResponse = new GetUserByIdResponse().fromJson(
				response.data
			);
			return new Response(
				true,
				response.message,
				getUserByUserIdResponse
			);

			// If data is retrieved and the data is empty, then return
		} else if (
			response.isSuccess &&
			response.message === "No records found"
		) {
			return new Response(true, "No records found", "");

			// If http method is timeout or being halt, then return
		} else if (!response.isSuccess) {
			return new Response(false, response.message, "");
		} else {
			return new Response(false, response.message, response.data);
		}
	}

	async saveUser(props: {
		purpose: string; // To identify the usage of this method. Exp: login, update, new_user
		userId?: string;
		email?: string;
		password?: string;
		username?: string;
		firstName?: string;
		lastName?: string;
		phoneNo?: string;
		acctType?: string;
		orgName?: string;
		packagePlan?: string;
	}): Promise<Response> {
		// Initialize the save user model
		const saveUser = new User({
			userId: props.userId,
			email: props.email,
			password: props.password,
			username: props.username,
			firstName: props.firstName,
			lastName: props.lastName,
			phoneNo: props.phoneNo,
			acctType: props.acctType,
			packagePlan: props.packagePlan,
			orgName: props.orgName,
		});

		// Object to Map, then to JSON
		const body = Object.fromEntries(saveUser.toJson());
		console.log(await LocalStorage.getAccessToken())

		let headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${await LocalStorage.getAccessToken()}`,
		};

		let response = await this.networking.postData(
			props.purpose === "login" ? "login_user" : "save_user", // API choice is depends on the usage
			body,
			headers
		);

		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			switch (props.purpose) {
				case "login":
					// Login api will return the user data, so the if statement is to get the user data.
					let getUserByUserIdResponse = null;
					if (props.purpose === "login") {
						getUserByUserIdResponse =
							new GetUserByIdResponse().fromJson(response.data);
					}
					// Save the frequently access data in browser localstorage
					LocalStorage.setUserID(
						props.userId ?? getUserByUserIdResponse![0].userId ?? ""
					);
					LocalStorage.setEmail(
						props.email ?? getUserByUserIdResponse![0].email ?? ""
					);
					LocalStorage.setNickName(
						getUserByUserIdResponse![0].username ?? ""
					);
					LocalStorage.setPackagePlan(
						getUserByUserIdResponse![0].packagePlan ?? ""
					);
					break;
				case "new_user":
					// Save the frequently access data in browser localstorage
					LocalStorage.setUserID(props.userId ?? "");
					LocalStorage.setEmail(props.email ?? "");
					LocalStorage.setNickName(props.username ?? "");
					LocalStorage.setPackagePlan(props.packagePlan ?? "");
					break;
				case "update":
					LocalStorage.setUserID(props.userId ?? "");
					LocalStorage.setNickName(props.username ?? "");
			}
			return new Response(true, response.message, response.data);

			// If data is retrieved and the data is empty, then return
		} else if (
			response.isSuccess &&
			response.message === "No records found"
		) {
			return new Response(true, "No records found", "");

			// If http method is timeout or being halt, then return
		} else if (!response.isSuccess) {
			return new Response(false, response.message, "");
		} else {
			return new Response(false, response.message, response.data);
		}
	}
}
