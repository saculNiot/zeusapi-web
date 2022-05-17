import { Role } from "./role_model";

export class Client {
	clientId?: string;
	name?: string;
	createdDateTime?: string;
	createdById?: string;
	attribute?: Array<ClientAttribute>;
	roles?: Array<Role>;

	constructor(props: {
		clientId?: string;
		name?: string;
		createdDateTime?: string;
		createdById?: string;
		attribute?: Array<ClientAttribute>;
		roles?: Array<Role>;
	}) {
		this.clientId = props.clientId;
		this.name = props.name;
		this.createdById = props.createdById;
		this.createdDateTime = props.createdDateTime;
		this.attribute = props.attribute;
		this.roles = props.roles;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.clientId = json.get("client_id");
		this.name = json.get("name");
		this.createdById = json.get("created_by_id");
		this.createdDateTime = json.get("created_date_time");
		this.attribute = new GetClientAttributeResponse().fromJson(
			json.get("attribute")
		);
		this.roles = new GetClientAttributeResponse().fromJson(
			json.get("relationship")
		);
		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("clientId", this.clientId);
		data.set("name", this.name);
		data.set("createdById", this.createdById)
		data.set("createdDateTime", this.createdDateTime);
		data.set("attribute", this.attribute);

		return data;
	}
}

export class GetClientResponse {
	client?: Array<Client>;

	constructor(client?: Array<Client>) {
		this.client = client;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (json.get("Client") != null) {
			this.client = [];
			json.get("Client").forEach((v: Map<String, any>) => {
				this.client?.push(
					new Client({}).fromJson(new Map(Object.entries(v)))
				);
			});
		}

		return this.client;
	}
}

export class ClientAttribute {
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
		this.attributeId = json.get("client_attr_id");
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

export class GetClientAttributeResponse {
	attribute?: Array<ClientAttribute>;

	constructor(attribute?: Array<ClientAttribute>) {
		this.attribute = attribute;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (json.get("attribute") != null) {
			this.attribute = [];
			json.get("attribute").forEach((v: Map<String, any>) => {
				this.attribute?.push(
					new ClientAttribute({}).fromJson(new Map(Object.entries(v)))
				);
			});
		}

		return this.attribute;
	}
}
