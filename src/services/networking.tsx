import axios from "axios";
import { useHistory } from "react-router-dom";
import { Constants } from "../utils/constants";
import { Response } from "./response";

export class Networking {
	url = Constants.urlLocal;
	apiVer = Constants.apiver;

	async getData(path: string, headers: any): Promise<Response> {
		try {
			if (this.url === "") {
				this.url = Constants.urlCloud;
			}

			let response = await axios.get(
				`${this.url}/${this.apiVer}/${path}`,
				{ headers }
			);
			if (response.status === 200) {
				let e = response.data;

				let data =
					e instanceof Array
						? e.map((x) => new Map<String, any>(Object.entries(x)))
						: new Map<String, any>(Object.entries(e));

				return new Response(true, "", data);
			} else if (response.status === 204) {
				return new Response(true, "No records found", "");
			} else {
				return new Response(false, response.data, response.data);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					/*
					 * The request was made and the server responded with a
					 * status code that falls out of the range of 2xx
					 */
					return new Response(
						false,
						error.response.data.toString(),
						error.response.data.toString()
					);
				} else if (error.request) {
					/*
					 * The request was made but no response was received, `error.request`
					 * is an instance of XMLHttpRequest in the browser and an instance
					 * of http.ClientRequest in Node.js
					 */
					return new Response(
						false,
						error.request.toString(),
						error.request.toString()
					);
				} else {
					// Something happened in setting up the request and triggered an Error
					return new Response(
						false,
						error.message.toString(),
						error.message.toString()
					);
				}
			}

			return new Response(false, "error", error);
		}
	}

	async postData(api: string, body: any, headers: any): Promise<Response> {
		try {
			if (this.url === "") {
				this.url = Constants.urlCloud;
			}

			let response = await axios.post(
				`${this.url}/${this.apiVer}/${api}`,
				body,
				{ headers }
			);
			if (response.status === 201 || response.status === 200) {
				var regexFormat = /[{}]/gm;

				// If the data retrieved is JSON
				if (regexFormat.test(JSON.stringify(response.data))) {
					return new Response(
						true,
						"",
						new Map(Object.entries(response.data))
					);
				} else {
					return new Response(true, "", response.data);
				}
			} else if (response.status === 204) {
				return new Response(true, "No records found", response.data);
			} else if (response.status === 401) {
				return new Response(true, "Session expired", response.data);
			} else {
				return new Response(false, response.data, response.data);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					/*
					 * The request was made and the server responded with a
					 * status code that falls out of the range of 2xx
					 */

					return new Response(
						false,
						error.response.data.toString(),
						error.response.data.toString()
					);
				} else if (error.request) {
					/*
					 * The request was made but no response was received, `error.request`
					 * is an instance of XMLHttpRequest in the browser and an instance
					 * of http.ClientRequest in Node.js
					 */
					return new Response(
						false,
						error.request.toString(),
						error.request.toString()
					);
				} else {
					// Something happened in setting up the request and triggered an Error
					return new Response(
						false,
						error.message.toString(),
						error.message.toString()
					);
				}
			}

			return new Response(false, "error", error);
		}
	}

	async patchData(api: string, body: any, headers: any): Promise<Response> {
		if (this.url === "") {
			this.url = Constants.urlCloud;
		}

		let response = await axios.patch(
			`${this.url}/${this.apiVer}/${api}`,
			body,
			{ headers }
		);

		return new Response(true, response.statusText, response.data);
	}

	async deleteData(api: string, body: any, headers?: any): Promise<Response> {
		if (this.url === "") {
			this.url = Constants.urlCloud;
		}

		let response = await axios.delete(`${this.url}/${this.apiVer}/${api}`, {
			headers,
			data: body,
		});

		return new Response(true, response.statusText, response.data);
	}
}
