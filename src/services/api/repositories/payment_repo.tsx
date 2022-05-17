import { LocalStorage } from "../../../utils/localStorage";
import { Networking } from "../../networking";
import { Response } from "../../response";
import { GetPaymentResponse, Payment } from "../models/payment_model";

export class PaymentRepo {
    networking = new Networking();

    async getCheckoutSessionUrl(props?: { userId: string, productId?: string }): Promise<Response> {
        const path = `userId=${props?.userId}&productId=${props?.productId}`;
        const headers = {
			"Authorization": `Bearer ${await LocalStorage.getAccessToken()}`,
        }
        let response = await this.networking.getData(`get_checkout_session_url?${path}`,headers);
        // If data is retrieved and the data is not empty, then return
        if (
            response.isSuccess &&
            response.data !== null &&
            response.data !== ""
        ) {
            let getPaymentResponse = new GetPaymentResponse().fromJson(
                response.data
            );
            return new Response(
                true,
                response.message,
                getPaymentResponse
            );

            // If data is retrieved and the data is empty, then return
        } else if (
            response.isSuccess &&
            response.message === "No records found"
        ) {
            return new Response(true, "No records found", "");

            // If http method is timeout or being halt, then return
        } else if (!response.isSuccess) {
            return new Response(false, response.message, "");
        } else {
            return new Response(false, response.message, response.data);
        }
    }

    async getCustomerPortalSessionUrl(props?: { userId: string, email:string }): Promise<Response> {
        const path = `userId=${props?.userId}&email=${props?.email}`;
        const headers = {
			"Authorization": `Bearer ${await LocalStorage.getAccessToken()}`,
        }
        let response = await this.networking.getData(`get_customer_payment_portal_url?${path}`,headers);
        // If data is retrieved and the data is not empty, then return
        if (
            response.isSuccess &&
            response.data !== null &&
            response.data !== ""
        ) {
            let getPaymentResponse = new GetPaymentResponse().fromJson(
                response.data
            );
            return new Response(
                true,
                response.message,
                getPaymentResponse
            );

            // If data is retrieved and the data is empty, then return
        } else if (
            response.isSuccess &&
            response.message === "No records found"
        ) {
            return new Response(true, "No records found", "");

            // If http method is timeout or being halt, then return
        } else if (!response.isSuccess) {
            return new Response(false, response.message, "");
        } else {
            return new Response(false, response.message, response.data);
        }
    }

    async savePayment(props :{
        userId?: string,
        email?: string,
        paymentMethodId?: string,
        productId?: string,
        amount?: number
    }): Promise<Response> {
        // Initialize the save user model
        const savePayment = new Payment(
            props.userId,
            props.email,
            props.paymentMethodId,
            props.productId,
            props.amount
        );

        // Object to Map, then to JSON
        const body = Object.fromEntries(savePayment.toJson());

        let headers = {
            "Content-Type": "application/json",
			"Authorization": `Bearer ${await LocalStorage.getAccessToken()}`,
        };

        let response = await this.networking.postData(
            "checkout_payment",
            body,
            headers
        );

        // If data is retrieved and the data is not empty, then return
        if (
            response.isSuccess &&
            response.data !== null &&
            response.data !== ""
        ) {
            return new Response(true, response.message, response.data);

            // If data is retrieved and the data is empty, then return
        } else if (
            response.isSuccess &&
            response.message === "No records found"
        ) {
            return new Response(true, "No records found", "");

            // If http method is timeout or being halt, then return
        } else if (!response.isSuccess) {
            return new Response(false, response.message, "");
        } else {
            return new Response(false, response.message, response.data);
        }
    }
}
