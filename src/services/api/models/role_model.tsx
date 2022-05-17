import { Client, GetClientResponse } from "./client_model";

export class Role {
	roleId?: string;
	name?: string;
	createdDateTime?: string;
	createdById?: string;
    clients?: Array<Client>;

	constructor(props: {
		roleId?: string;
		name?: string;
		createdDateTime?: string;
		createdById?: string;
        clients?: Array<Client>;

	}) {
		this.roleId = props.roleId;
		this.name = props.name;
		this.createdById = props.createdById;
		this.createdDateTime = props.createdDateTime;
        this.clients = props.clients;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.roleId = json.get("role_id");
		this.name = json.get("name");
		this.createdById = json.get("created_by_id");
		this.createdDateTime = json.get("created_date_time");

		let clientMap = new Map<String, any>().set(
			"Client",
			json.get("relationship")
		);
        this.clients = new GetClientResponse().fromJson(
			clientMap
		);

		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("roleId", this.roleId);
		data.set("name", this.name);
		data.set("createdById", this.createdById)
		data.set("createdDateTime", this.createdDateTime);

		return data;
	}
}

export class GetRoleResponse {
	role?: Array<Role>;

	constructor(client?: Array<Role>) {
		this.role = client;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (json.get("Role") != null) {
			this.role = [];
			json.get("Role").forEach((v: Map<String, any>) => {
				this.role?.push(
					new Role({}).fromJson(new Map(Object.entries(v)))
				);
			});
		}

		return this.role;
	}
}


