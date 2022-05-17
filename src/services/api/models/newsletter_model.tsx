export class Newsletter {
	email?: string;

	constructor(prop: { email?: string }) {
		this.email = prop.email;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.email = json.get("email");

		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("email", this.email);

		return data;
	}
}
