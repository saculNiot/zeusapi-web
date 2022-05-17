export class LocalStorage {
	static setUserID = async (userID: string) => {
		localStorage.setItem("user_id", userID);
	};
	static getUserID = async () => {
		return localStorage.getItem("user_id");
	};
	static getAuth = () => {
		return localStorage.getItem("user_id");
	};
	static setEmailVerified = async (isVerified: string) => {
		localStorage.setItem("email_verified", isVerified);
	};
	static getEmailVerified = () => {
		return localStorage.getItem("email_verified");
	};

	static setEmail = async (email: string) => {
		localStorage.setItem("email", email);
	};
	static getEmail = async () => {
		return localStorage.getItem("email");
	};
	static setNickName = async (nickname: string) => {
		localStorage.setItem("nickname", nickname);
	};
	static getNickname = async () => {
		return localStorage.getItem("nickname");
	};
	static setPackagePlan = async (packagePlan: string) => {
		localStorage.setItem("package_plan", packagePlan);
	};
	static getPackagePlan = () => {
		return localStorage.getItem("package_plan");
	};
	static setAccessToken = async (token: string) => {
		localStorage.setItem("access_token", token);
	};
	static getAccessToken = async () => {
		return localStorage.getItem("access_token");
	};
	static resetStorage = async () => {
		localStorage.clear();
	};
}
