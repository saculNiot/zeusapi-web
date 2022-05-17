import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configSetup";

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<any>();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return unsubscribe;
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
