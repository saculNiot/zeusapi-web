import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "./configSetup";
import { Response } from "../services/response";

export class FirebaseServices {
	static convertToMessage = async (errorCode: string) => {
		return errorCode
			.substring(errorCode.indexOf("/") + 1)
			.replaceAll("-", " ")
			.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
	};
	static createAccount = async (email: string, password: string) => {
		try {
			let userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			sendEmailVerification(userCredential.user);
			return new Response(
				true,
				"Registration Success",
				userCredential.user
			);
		} catch (error: any) {
			return new Response(
				false,
				await FirebaseServices.convertToMessage(error.code.toString()),
				""
			);
		}
	};

	static sendEmailVerification = async (user: any) => {
		try {
			sendEmailVerification(user);
			return new Response(true, "Send email verification success", "");
		} catch (error: any) {
			return new Response(
				false,
				await FirebaseServices.convertToMessage(error.code.toString()),
				""
			);
		}
	};

	static logIn = async (email: string, password: string) => {
		try {
			let userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			return new Response(true, "Log In sucess", userCredential.user);
		} catch (error: any) {
			return new Response(
				false,
				await FirebaseServices.convertToMessage(error.code.toString()),
				""
			);
		}
	};

	static resetPassword = async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email);
			return new Response(true, "Log In sucess", "Success");
		} catch (error: any) {
			return new Response(
				false,
				await FirebaseServices.convertToMessage(error.code.toString()),
				""
			);
		}
	};

	static signOut = async () => {
		signOut(auth);
	};
}
