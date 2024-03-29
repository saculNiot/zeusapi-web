import {
	BrowserRouter,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import { Home } from "./pages/home/Home";
import { ForgotPassword } from "./pages/login/ForgotPassword";
import { Login } from "./pages/login/Login";
import { CheckoutPayment } from "./pages/payment/CheckoutPayment";
import { ProductChoices } from "./pages/payment/ProductChoices";
import { EmailVerification } from "./pages/register/EmailVerification";
import { Register } from "./pages/register/Register";

import { RoutePath } from "./utils/routePath";
import { UserProfile } from "./pages/profile/UserProfile";
import { ResetPassword } from "./pages/profile/ResetPassword";
import { LocalStorage } from "./utils/localStorage";
import { MainDashboard } from "./pages/dashboard/MainDashboard";
import { CreateClient } from "./pages/client/CreateClient";
import { CreateRole } from "./pages/role/CreateRole";
import { CreateRelationship } from "./pages/relationship/CreateRelationship";
import { ClientList } from "./pages/client/ClientList";
import { RoleList } from "./pages/role/RoleList";
import { AccessLogList } from "./pages/accesslog/AccessLogList";
import { CreateRelationshipABAC } from "./pages/relationship/CreateRelationshipABAC";

interface AppProps {}

export const App: React.FC<AppProps> = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path={RoutePath.default} exact component={Home} />
				<Route path={RoutePath.login} exact component={Login} />
				<Route path={RoutePath.register} exact component={Register} />
				<Route
					path={RoutePath.forgot_password}
					exact
					component={ForgotPassword}
				/>
				<Route path={RoutePath.home} exact component={Home} />
				<Route
					path={RoutePath.email_verification}
					exact
					component={EmailVerification}
				/>
				)
				<Route
					path={RoutePath.product_choices}
					exact
					component={ProductChoices}
				/>
				<Route
					path={RoutePath.checkout_payment}
					exact
					component={CheckoutPayment}
				/>
				<ProtectedRoute
					path={RoutePath.user_profile}
					exact
					component={UserProfile}
				/>
				<ProtectedRoute
					path={RoutePath.reset_password}
					exact
					component={ResetPassword}
				/>
				<ProtectedRoute
					path={RoutePath.dashboard}
					exact
					component={MainDashboard}
				/>
				<ProtectedRoute
					path={RoutePath.create_client}
					exact
					component={CreateClient}
				/>
				<ProtectedRoute
					path={RoutePath.create_role}
					exact
					component={CreateRole}
				/>
				<ProtectedRoute
					path={RoutePath.create_relationship}
					exact
					component={CreateRelationship}
				/>
				<ProtectedRoute
					path={RoutePath.create_relationship_abac}
					exact
					component={CreateRelationshipABAC}
				/>
				<ProtectedRoute
					path={RoutePath.client_list}
					exact
					component={ClientList}
				/>
				<ProtectedRoute
					path={RoutePath.role_list}
					exact
					component={RoleList}
				/>
				<ProtectedRoute
					path={RoutePath.access_log_list}
					exact
					component={AccessLogList}
				/>
			</Switch>
		</BrowserRouter>
	);
};

// Auth Protector
const ProtectedRoute = (props: any) => {
	return LocalStorage.getAuth() ? (
		LocalStorage.getEmailVerified() === "false" ? (
			<Redirect exact to={RoutePath.email_verification} />
		) : LocalStorage.getPackagePlan() === "free" ? (
			<Redirect exact to={RoutePath.product_choices}  />
		) : (
			<Route {...props} />
		)
	) : (
		<Redirect exact  to={RoutePath.default}  />
	);
};

// const ProtectedRoute = (props: any) => {
// 	return LocalStorage.getAuth() ? (
// 		LocalStorage.getEmailVerified() === "false" ? (
// 			<Redirect exact to={RoutePath.email_verification} />
// 		) : (
// 			<Route {...props} />
// 		)
// 	) : (
// 		<Redirect exact to={RoutePath.default} />
// 	);
// };
