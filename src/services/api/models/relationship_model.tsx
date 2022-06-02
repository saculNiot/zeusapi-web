import { Client, GetClientResponse } from "./client_model";
import { GetRoleResponse, Role } from "./role_model";

export class Relationship {
	clientRoleRelId?: string;
	permission?: string;
	createdDateTime?: string;
	createdById?: string;
	client?: any;
	role?: any;
	clientAttribute?: any;
	roleAttribute?: any;

	constructor(props: {
		clientRoleRelId?: string;
		permission?: string;
		createdDateTime?: string;
		createdById?: string;
		client?: any;
		role?: any;
		clientAttribute?: any;
		roleAttribute?: any;
	}) {
		this.clientRoleRelId = props.clientRoleRelId;
		this.permission = props.permission;
		this.createdDateTime = props.createdDateTime;
		this.createdById = props.createdById;
		this.client = props.client;
		this.role = props.role;
		this.clientAttribute = props.clientAttribute;
		this.roleAttribute = props.roleAttribute;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.clientRoleRelId = json.get("client_role_rel_id");
		this.permission = json.get("permission");
		this.createdById = json.get("created_by_id");
		this.createdDateTime = json.get("added_date_time");

		let clientMap = new Map<String, any>().set(
			"Client",
			new Array<any>(json.get("client"))
		);

		this.client = new GetClientResponse().fromJson(clientMap);

		let roleMap = new Map<String, any>().set(
			"Role",
			new Array<any>(json.get("role"))
		);
		this.role = new GetRoleResponse().fromJson(roleMap);

		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("clientRoleRelId", this.clientRoleRelId);
		data.set("permission", this.permission);
		data.set("createdById", this.createdById);
		data.set("added_date_time", this.createdDateTime);
		data.set("role", this.role);
		data.set("client", this.client);
		data.set("roleAttribute", this.roleAttribute);
		data.set("clientAttribute", this.clientAttribute);

		return data;
	}
}

export class GetRelationshipResponse {
	relationship?: Array<Relationship>;

	constructor(relationship?: Array<Relationship>) {
		this.relationship = relationship;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (json.get("Relationship") != null) {
			this.relationship = [];
			json.get("Relationship").forEach((v: Map<String, any>) => {
				this.relationship?.push(
					new Relationship({}).fromJson(new Map(Object.entries(v)))
				);
			});
		}

		return this.relationship;
	}
}
