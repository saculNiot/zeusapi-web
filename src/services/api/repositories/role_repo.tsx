import { FirebaseServices } from "../../../utils/firebaseServices";
import { LocalStorage } from "../../../utils/localStorage";
import { RoutePath } from "../../../utils/routePath";
import { Networking } from "../../networking";
import { Response } from "../../response";
import { GetRoleResponse, Role } from "../models/role_model";

export class RoleRepo {
	networking = new Networking();

	async getAllRoles(value?: { history?: any }): Promise<Response> {
		let headers = {
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};
		let response = await this.networking.getData(
			`get_all_role_by_createdby_id`,
			headers
		);
		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			console.log(response.data);
			let getRoleResponse = new GetRoleResponse().fromJson(response.data);
			return new Response(true, response.message, getRoleResponse);

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
			// Go back to default page if session expired
			await FirebaseServices.signOut();
			await LocalStorage.resetStorage();
			alert("Session Expired.Please sign in again.");
			value?.history.replace(RoutePath.default);
			return new Response(false, "Session expired", "");

			// If http method is timeout or being halt, then return
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

	async getRoleById(value?: {
		history?: any;
		roleId: string;
	}): Promise<Response> {
		const path = `roleId=${value?.roleId}`;
		let headers = {
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};
		let response = await this.networking.getData(
			`get_role_by_id?${path}`,
			headers
		);
		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			console.log(response.data);
			let getRoleResponse = new GetRoleResponse().fromJson(response.data);
			return new Response(true, response.message, getRoleResponse);

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

	async saveRole(props: {
		history?: any;
		createdById?: string;
		roleId?: string;
		name?: string;
		attribute?: Array<any>;
	}): Promise<Response> {
		// Initialize the save user model
		const saveRole = new Role({
			createdById: props.createdById,
			roleId: props.roleId,
			name: props.name,
			attribute: props.attribute,
		});

		// Object to Map, then to JSON
		const body = Object.fromEntries(saveRole.toJson());

		let headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};

		let response = await this.networking.postData(
			"save_role", // API choice is depends on the usage
			body,
			headers
		);

		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			console.log(response.data);
			return new Response(true, response.message, response.data);

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
			// Go back to default page if session expired
			await FirebaseServices.signOut();
			await LocalStorage.resetStorage();
			alert("Session Expired.Please sign in again.");
			props?.history.replace(RoutePath.default);
			return new Response(false, "Session expired", "");
		} else if (
			!response.isSuccess &&
			response.message === "Payment Required"
		) {
			// Go back to product page if payment not made
			alert(response.data);
			props?.history.replace(RoutePath.product_choices);
			return new Response(false, response.message, response.data);

			// If http method is timeout or being halt, then return
		} else if (!response.isSuccess) {
			return new Response(false, response.message, "");
		} else {
			return new Response(false, response.message, response.data);
		}
	}

	async deleteRole(props: {
		history: any;
		roleId?: string;
	}): Promise<Response> {
		// Initialize the save user model
		const delete_role = new Role({
			roleId: props.roleId,
		});

		// Object to Map, then to JSON
		const body = Object.fromEntries(delete_role.toJson());

		let headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await LocalStorage.getAccessToken()}`,
		};

		let response = await this.networking.deleteData(
			"delete_role", // API choice is depends on the usage
			body,
			headers
		);

		// If data is retrieved and the data is not empty, then return
		if (
			response.isSuccess &&
			response.data !== null &&
			response.data !== ""
		) {
			console.log(response.data);
			return new Response(true, response.message, response.data);

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
			// Go back to default page if session expired
			await FirebaseServices.signOut();
			await LocalStorage.resetStorage();
			alert("Session Expired.Please sign in again.");
			props?.history.replace(RoutePath.default);
			return new Response(false, "Session expired", "");

		} else if (
			!response.isSuccess &&
			response.message === "Payment Required"
		) {
			// Go back to product page if payment not made
			alert(response.data);
			props?.history.replace(RoutePath.product_choices);
			return new Response(false, response.message, response.data);

			// If http method is timeout or being halt, then return
		} else if (!response.isSuccess) {
			return new Response(false, response.message, "");
		} else {
			return new Response(false, response.message, response.data);
		}
	}
}
