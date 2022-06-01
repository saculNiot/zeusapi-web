import { GetRelationshipResponse, Relationship } from "./relationship_model";

export class Role {
	roleId?: string;
	name?: string;
	createdDateTime?: string;
	createdById?: string;
	attribute?: Array<RoleAttribute>;
	clients?: Array<Relationship>;

	constructor(props: {
		roleId?: string;
		name?: string;
		createdDateTime?: string;
		createdById?: string;
		attribute?: Array<RoleAttribute>;
		clients?: Array<Relationship>;
	}) {
		this.roleId = props.roleId;
		this.name = props.name;
		this.createdById = props.createdById;
		this.createdDateTime = props.createdDateTime;
		this.attribute = props.attribute
		this.clients = props.clients;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.roleId = json.get("role_id");
		this.name = json.get("name");
		this.createdById = json.get("created_by_id");
		this.createdDateTime = json.get("created_date_time");
		let attributeMap = new Map<String, any>().set(
			"attribute",
			json.get("attribute")
		);
		this.attribute = new GetRoleAttributeResponse().fromJson(
			attributeMap
		);
		let clientMap = new Map<String, any>().set(
			"Relationship",
			json.get("relationship")
		);

		this.clients = new GetRelationshipResponse().fromJson(clientMap);

		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("roleId", this.roleId);
		data.set("name", this.name);
		data.set("createdById", this.createdById);
		data.set("createdDateTime", this.createdDateTime);
		data.set("attribute", this.attribute);
		
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

export class RoleAttribute {
	attributeId?: string;
	key?: string;
	value?: string;

	constructor(props: { attributeId?: string; key?: string; value?: string }) {
		this.attributeId = props.attributeId;
		this.key = props.key;
		this.value = props.value;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.attributeId = json.get("role_attr_id");
		this.key = json.get("key");
		this.value = json.get("value");

		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("client_attr_id", this.attributeId);
		data.set("key", this.key);
		data.set("value", this.value);

		return data;
	}
}

export class GetRoleAttributeResponse {
	attribute?: Array<RoleAttribute>;

	constructor(attribute?: Array<RoleAttribute>) {
		this.attribute = attribute;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (json.get("attribute") != null) {
			this.attribute = [];
			json.get("attribute").forEach((v: Map<String, any>) => {
				this.attribute?.push(
					new RoleAttribute({}).fromJson(new Map(Object.entries(v)))
				);
			});
		}

		return this.attribute;
	}
}
