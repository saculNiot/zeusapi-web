import { LocalStorage } from "../../../utils/localStorage";
import { Networking } from "../../networking";
import { Response } from "../../response";
import { Newsletter } from "../models/newsletter_model";
import { GetUserByIdResponse, User } from "../models/user_model";

export class NewsletterRepo {
	networking = new Networking();

	async subscribeNewsletter(props: {

		email?: string;
	}): Promise<Response> {
		// Initialize the save user model
		const subscribeNewsletter = new Newsletter({
			email: props.email,

		});

		// Object to Map, then to JSON
		const body = Object.fromEntries(subscribeNewsletter.toJson());

		let headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${await LocalStorage.getAccessToken()}`,
		};

		let response = await this.networking.postData(
			"subscribe_newsletter", // API choice is depends on the usage
			body,
			headers
		);

		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			return new Response(true, response.message, true);

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
