import { LocalStorage } from "../../../utils/localStorage";
import { Networking } from "../../networking";
import { Response } from "../../response";
import { Client, GetClientResponse } from "../models/client_model";

export class ClientRepo {
	networking = new Networking();

	async getAllClients(value?: { userId: string }): Promise<Response> {
		const path = `userId=${value?.userId}`;
		let headers = {
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};
		let response = await this.networking.getData(
			`get_all_client_by_createdby_id?${path}`,
			headers
		);
		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			let getClientResponse = new GetClientResponse().fromJson(
				response.data
			);
			return new Response(true, response.message, getClientResponse);

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

	async getClientById(value?: { clientId: string }): Promise<Response> {
		const path = `clientId=${value?.clientId}`;
		let headers = {
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};
		let response = await this.networking.getData(
			`get_client_by_id?${path}`,
			headers
		);
		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			
			let getClientResponse = new GetClientResponse().fromJson(
				response.data
			);
			return new Response(true, response.message, getClientResponse);

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

	async saveClient(props: {
		createdById?:string;
		clientId?: string;
		name?: string;
		attribute?: Array<any>;
	}): Promise<Response> {
		// Initialize the save user model
		const saveClient = new Client({
			createdById: props.createdById,
			clientId: props.clientId,
			name: props.name,
			attribute: props.attribute,
		});

		// Object to Map, then to JSON
		const body = Object.fromEntries(saveClient.toJson());

		let headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};

		let response = await this.networking.postData(
			"save_client", // API choice is depends on the usage
			body,
			headers
		);

		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
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

    async deleteClient(props: { clientId?: string }): Promise<Response> {
		// Initialize the save user model
		const delete_url = new Client({
			clientId: props.clientId,
		});

		// Object to Map, then to JSON
		const body = Object.fromEntries(delete_url.toJson());

        let headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};


		let response = await this.networking.deleteData(
			"delete_client", // API choice is depends on the usage
			body,
            headers
		);

		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
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
