export class AccessLog {
	requestId?: string;
	user?: string;
	client?: string;
	role?: string;
	relationship?: string;
	api?: string;
	createdDateTime?: string;

	constructor(props: {
		requestId?: string;
		user?: string;
		client?: string;
		role?: string;
		relationship?: string;
		api?: string;
		createdDateTime?: string;
	}) {
		this.requestId = props.requestId;
		this.user = props.user;
		this.client = props.client;
		this.role = props.role;
		this.relationship = props.relationship;
		this.api = props.api;
        this.createdDateTime = props.createdDateTime;
        
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.requestId = json.get("request_id");
		this.user = json.get("user");
		this.client = json.get("client");
		this.role = json.get("role");
        this.relationship = json.get("client_role_relationship");
		this.api = json.get("api");
        this.createdDateTime = json.get("created_date_time");
		


		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("requestId", this.requestId);
		data.set("user", this.user);
		data.set("client", this.client);
		data.set("role", this.role);
		data.set("clientRoleRelationship", this.relationship);
        data.set("api", this.api);

		return data;
	}
}

export class GetAccessLogResponse {
	accessLog?: Array<AccessLog>;

	constructor(accessLog?: Array<AccessLog>) {
		this.accessLog = accessLog;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (json.get("AccessLog") != null) {
			this.accessLog = [];
			json.get("AccessLog").forEach((v: Map<String, any>) => {
				this.accessLog?.push(
					new AccessLog({}).fromJson(new Map(Object.entries(v)))
				);
			});
		}

		return this.accessLog;
	}
}
