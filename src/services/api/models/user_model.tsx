// User model class
export class User {
	userId?: string;
	email?: string;
	password?: string;
	username?: string;
	firstName?: string;
	lastName?: string;
	phoneNo?: string;
	acctType?: string; // Account Type
	packagePlan?: string;
	orgName?: string; // Organization Type
	userApiId?: string;

	constructor(props: {
		userId?: string;
		email?: string;
		password?: string;
		username?: string;
		firstName?: string;
		lastName?: string;
		phoneNo?: string;
		acctType?: string;
		packagePlan?: string;
		orgName?: string;
		userApiId?: string;
	}) {
		this.userId = props.userId;
		this.email = props.email;
		this.password = props.password;
		this.username = props.username;
		this.firstName = props.firstName;
		this.lastName = props.lastName;
		this.phoneNo = props.phoneNo;
		this.acctType = props.acctType;
		this.packagePlan = props.packagePlan;
		this.orgName = props.orgName;
		this.userApiId = props.userApiId;
	}

	// Convert the map into the User object
	fromJson(json: Map<String, any>) {
		this.userId = json.get("user_id");
		this.email = json.get("email");
		this.password = json.get("password");
		this.username = json.get("username");
		this.firstName = json.get("first_name");
		this.lastName = json.get("last_name");
		this.phoneNo = json.get("phone_num");
		this.acctType = json.get("acct_type");
		this.packagePlan = json.get("package_plan");
		this.orgName = json.get("org_name");
		this.userApiId = json.get("user_api_id");

		return this;
	}

	// Convert User Object into map
	toJson() {
		let data = new Map<String, any>();
		data.set("userId", this.userId);
		data.set("email", this.email);
		data.set("password", this.password);
		data.set("username", this.username);
		data.set("firstName", this.firstName);
		data.set("lastName", this.lastName);
		data.set("phoneNum", this.phoneNo);
		data.set("acctType", this.acctType);
		data.set("packagePlan", this.packagePlan);
		data.set("orgName", this.orgName);
		data.set("userApiId", this.userApiId);

		return data;
	}
}

export class GetUserByIdResponse {
	user?: Array<User>;

	constructor(user?: Array<User>) {
		this.user = user;
	}

	// Convert JSON (containing list of data) to array
	fromJson(json: Map<String, any>) {
		if (json.get("User") != null) {
			this.user = [];
			json.get("User").forEach((v: Map<String, any>) => {
				this.user?.push(
					new User({}).fromJson(new Map(Object.entries(v)))
				);
			});
		}

		return this.user;
	}
}
