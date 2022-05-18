import { LocalStorage } from "../../../utils/localStorage";
import { Networking } from "../../networking";
import { Response } from "../../response";
import {
	GetRelationshipResponse,
	Relationship,
} from "../models/relationship_model";

export class RelationshipRepo {
	networking = new Networking();

	async getAllRelationship(value?: { userId: string }): Promise<Response> {
		const path = `userId=${value?.userId}`;
		let headers = {
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};
		let response = await this.networking.getData(
			`get_all_relationship_by_createdby_id?${path}`,
			headers
		);
		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			let getRelationshipResponse =
				new GetRelationshipResponse().fromJson(response.data);
			return new Response(
				true,
				response.message,
				getRelationshipResponse
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

	async getRelationshipById(value?: {
		relationshipId: string;
	}): Promise<Response> {
		const path = `clientRoleRelId=${value?.relationshipId}`;
		let headers = {
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};
		let response = await this.networking.getData(
			`get_relationship_by_id?${path}`,
			headers
		);
		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			let getRelationshipResponse =
				new GetRelationshipResponse().fromJson(response.data);
			return new Response(
				true,
				response.message,
				getRelationshipResponse
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

	async saveRelationship(props: {
		createdById?: string;
		clientRoleRelId?: string;
		permission?: string;
		client?: string;
		role?: string;
	}): Promise<Response> {
		// Initialize the save user model
		const saveRelationship = new Relationship({
			clientRoleRelId: props.clientRoleRelId,
			permission: props.permission,
			client: props.client,
			role: props.role,
			createdById: props.createdById,
		});

		// Object to Map, then to JSON
		const body = Object.fromEntries(saveRelationship.toJson());

		let headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};

		let response = await this.networking.postData(
			"save_relationship", // API choice is depends on the usage
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

	async deleteRelationship(props: { clientRoleRelId?: string }): Promise<Response> {
		// Initialize the save user model
		const delete_relationship = new Relationship({
			clientRoleRelId: props.clientRoleRelId,
		});

		// Object to Map, then to JSON
		const body = Object.fromEntries(delete_relationship.toJson());

		let headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};

		let response = await this.networking.deleteData(
			"delete_relationship", // API choice is depends on the usage
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
