export class Ticket {
    ticketId?: string;
    userId?: string;
    name?: string;
    email?: string;
    ticketType?: string;
    issueDesc?: string;
    constructor(
        ticketId?: string,
        userId?: string,
        name?: string,
        email?: string,
        ticketType?: string,
        issueDesc?: string
    ) {
        this.ticketId = ticketId;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.ticketType = ticketType;
        this.issueDesc = issueDesc;
    }

    // Convert the map into the User object
    fromJson(json: Map<String, any>) {
        this.ticketId = json.get("ticket_id");
        this.userId = json.get("user_id");
        this.name = json.get("name");
        this.email = json.get("email");
        this.ticketType = json.get("ticket_type");
        this.issueDesc = json.get("issue_desc");

        return this;
    }

    // Convert User Object into map
    toJson() {
        let data = new Map<String, any>();
        data.set("ticketId", this.ticketId);
        data.set("userId", this.userId);
        data.set("name", this.name);
        data.set("email", this.email);
        data.set("ticketType", this.ticketType);
        data.set("issueDesc", this.issueDesc);

        return data;
    }
}
