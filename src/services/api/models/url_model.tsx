// User model class
export class UserUrl {
	urlId?: string;
	userId?: string;
	apiKey?: string;
	url?: string;
	schema?: Array<SchemaField>;
	configParam?: Array<ConfigParam>;

	constructor(prop: {
		urlId?: string;
		userId?: string;
		apiKey?: string;
		url?: string;
		schema?: Array<SchemaField>;
		configParam?: Array<any>;
	}) {
		this.urlId = prop.urlId;
		this.userId = prop.userId;
		this.apiKey = prop.apiKey;
		this.url = prop.url;
		this.schema = prop.schema;
		this.configParam = prop.configParam;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.urlId = json.get("url_id");
		this.userId = json.get("user");
		this.apiKey = json.get("api_key");
		this.url = json.get("url");
		// Assign a key for the schema field value to avoid undefined key in getSchemaResposne method
		this.schema = new GetSchemaFieldResponse().fromJson(
			new Map(Object.entries({ SchemaField: json.get("schema") }))
		);
		// Assign a key for the param field value to avoid undefined key in GetConfigParamResponse method

		this.configParam = new GetConfigParamResponse().fromJson(
			new Map(Object.entries({ ConfigParam: json.get("config_param") }))
		);

		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("urlId", this.urlId);
		data.set("user", this.userId);
		data.set("apiKey", this.apiKey);
		data.set("url", this.url);
		data.set("schema", this.schema);
		data.set("configParam", this.configParam);

		return data;
	}
}

export class GetUserUrlResponse {
	userUrl?: Array<UserUrl>;

	constructor(userUrl?: Array<UserUrl>) {
		this.userUrl = userUrl;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (json.get("UserUrl") != null) {
			this.userUrl = [];
			json.get("UserUrl").forEach((v: Map<String, any>) => {
				this.userUrl?.push(
					new UserUrl({}).fromJson(new Map(Object.entries(v)))
				);
			});
		}

		return this.userUrl;
	}
}

export class SchemaField {
	schemaFieldId?: string;
	url?: string; // Url id/ Url
	name?: string;
	labelName?: string;
	dataType?: string;
	createdDateTime?: string;

	constructor(prop: {
		schemaFieldId?: string;
		url?: string;
		name?: string;
		labelName?: string;
		dataType?: string;
		createdDateTime?: string;
	}) {
		this.schemaFieldId = prop.schemaFieldId;
		this.url = prop.url;
		this.name = prop.name;
		this.labelName = prop.labelName;
		this.dataType = prop.dataType;
		this.createdDateTime = prop.createdDateTime;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.schemaFieldId = json.get("schema_field_id");
		this.url = json.get("url");
		this.name = json.get("name");
		this.labelName = json.get("label_name");
		this.dataType = json.get("data_type");
		this.createdDateTime = json.get("created_date_time");

		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("schemaFieldId", this.schemaFieldId);
		data.set("url", this.url);
		data.set("name", this.name);
		data.set("labelName", this.labelName);
		data.set("dataType", this.dataType);
		data.set("createdDateTime", this.createdDateTime);

		return data;
	}
}

export class GetSchemaFieldResponse {
	schemaField?: Array<SchemaField>;

	constructor(schemaField?: Array<SchemaField>) {
		this.schemaField = schemaField;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (
			json.get("SchemaField") !== null &&
			json.get("SchemaField") !== undefined
		) {
			this.schemaField = [];
			json.get("SchemaField").forEach((v: Map<String, any>) => {
				this.schemaField?.push(
					new SchemaField({}).fromJson(new Map(Object.entries(v)))
				);
			});
		}

		return this.schemaField;
	}
}

export class ConfigParam {
	paramId?: string;
	url?: string; // Url id/ Url
	name?: string;
	defaultValue?: string;
	createdDateTime?: string;

	constructor(prop: {
		paramId?: string;
		url?: string;
		name ?: string;
		defaultValue?: string;
		createdDateTime?: string;
	}) {
		this.paramId = prop.paramId;
		this.url = prop.url;
		this.name = prop.name;
		this.defaultValue = prop.defaultValue;
		this.createdDateTime = prop.createdDateTime;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.paramId = json.get("param_id");
		this.url = json.get("url");
		this.name = json.get("name");
		this.defaultValue = json.get("default_value");
		this.createdDateTime = json.get("created_date_time");

		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("paramId", this.paramId);
		data.set("url", this.url);
		data.set("name", this.name);
		data.set("defaultValue", this.defaultValue);
		data.set("createdDateTime", this.createdDateTime);

		return data;
	}
}

export class GetConfigParamResponse {
	configParam?: Array<ConfigParam>;

	constructor(configParam?: Array<ConfigParam>) {
		this.configParam = configParam;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (
			json.get("ConfigParam") !== null &&
			json.get("ConfigParam") !== undefined
		) {
			this.configParam = [];
			json.get("ConfigParam").forEach((v: Map<String, any>) => {
				this.configParam?.push(
					new ConfigParam({}).fromJson(new Map(Object.entries(v)))
				);
			});
		}

		return this.configParam;
	}
}

export class DataRows {
	userApiId?: string;
	apiKey?: string;
	dimensionArray?: Array<string>;
	metricsArray?: Array<string>;
	metricsOperation?: Array<string>;
	

	constructor(prop: {
		userApiId?: string;
		apiKey?: string;
		dimensionArray?: Array<string>;
		metricsArray?: Array<string>;
		metricsOperation?: Array<string>;
	}) {
		this.userApiId = prop.userApiId;
		this.apiKey = prop.apiKey;
		this.dimensionArray = prop.dimensionArray;
		this.metricsArray = prop.metricsArray;
		this.metricsOperation = prop.metricsOperation;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.userApiId = json.get("user_api_id");
		this.apiKey = json.get("api_key");
		this.dimensionArray = json.get("dimension_array");
		this.metricsArray = json.get("metrics_array");
		this.metricsOperation = json.get("metrics_operation");

		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("userApiId", this.userApiId);
		data.set("apiKey", this.apiKey);
		data.set("dimensionArray", this.dimensionArray);
		data.set("metricsArray", this.metricsArray);
		data.set("metricsOperation", this.metricsOperation);

		return data;
	}
}

export class GetDataRowsResponse {
	dataRows?: any;

	constructor(dataRows?: Array<{}>) {
		this.dataRows = dataRows;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (
			json.get("DataRows") !== null &&
			json.get("DataRows") !== undefined
		) {
			this.dataRows = json.get("DataRows");
		}

		return this.dataRows;
	}
}

export class Graphs {
	userApiId?: string;
	apiKey?: string;
	layouts?:Array<any>;
	graphs?: Array<{
		dimension_array: Array<any>;
		metrics_operation_array: Array<string>;
		data_grid:Array<any>;
	}>;

	constructor(prop: {
		userApiId?: string;
		apiKey?: string;
		layouts?:Array<any>;
		graphs?: Array<{
			dimension_array: Array<any>;
			metrics_operation_array: Array<any>;
			data_grid:Array<any>;
		}>;
	}) {
		this.userApiId = prop.userApiId;
		this.apiKey = prop.apiKey;
		this.layouts = prop.layouts;
		this.graphs = prop.graphs;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.userApiId = json.get("user_api_id");
		this.apiKey = json.get("api_key");
		this.layouts = json.get("layouts");
		this.graphs = json.get("graphs");

		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("userApiId", this.userApiId);
		data.set("apiKey", this.apiKey);
		data.set("layouts", this.layouts);
		data.set("graphs", this.graphs);

		return data;
	}
}

export class GetGraphsResponse {
	dataRows?: any;

	constructor(dataRows?: Array<{}>) {
		this.dataRows = dataRows;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (
			json.get("DataRows") !== null &&
			json.get("DataRows") !== undefined
		) {
			this.dataRows = json.get("DataRows");
		}

		return this.dataRows;
	}
}
