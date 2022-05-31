import { FirebaseServices } from "../../../utils/firebaseServices";
import { LocalStorage } from "../../../utils/localStorage";
import { RoutePath } from "../../../utils/routePath";
import { Networking } from "../../networking";
import { Response } from "../../response";
import { GetAccessLogResponse } from "../models/accesslog_model";

export class AccessLogRepo {
	networking = new Networking();

	async getAccessLog(value?: { history?: any }): Promise<Response> {
		let headers = {
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};
		let response = await this.networking.getData(
			`get_accesslog_by_createdby_id`,
			headers
		);
		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			console.log(response.data);
			let getAccessLogResponse = new GetAccessLogResponse().fromJson(
				response.data
			);
			return new Response(true, response.message, getAccessLogResponse);

			// If data is retrieved and the data is empty, then return
		} else if (
			response.isSuccess &&
			response.message === "No records found"
		) {
			return new Response(true, "No records found", "");

			// If http method is timeout or being halt, then return
		} else if (
			!response.isSuccess &&
			response.message === "Session expired"
		) {
			console.log("here2");
			// Go back to default page if session expired
			await FirebaseServices.signOut();
			await LocalStorage.resetStorage();
			alert("Session Expired.Please sign in again.");
			value?.history.replace(RoutePath.default);
			return new Response(false, "Session expired", "");
		} else if (
			!response.isSuccess &&
			response.message === "Payment Required"
		) {
			// Go back to product page if payment not made
			alert(response.data);
			value?.history.replace(RoutePath.product_choices);
			return new Response(false, response.message, response.data);

			// If http method is timeout or being halt, then return
		} else if (!response.isSuccess) {
			return new Response(false, response.message, "");
		} else {
			return new Response(false, response.message, response.data);
		}
	}
}
