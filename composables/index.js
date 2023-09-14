import { getMessaging, getToken } from "firebase/messaging";
import { getDatabase } from "firebase/database"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const useMessaging = () => {
	const { $firebaseApp } = useNuxtApp()
	const messaging = getMessaging($firebaseApp);
	return messaging
}

export const useToken = async () => {
	
	let token = await getToken(useMessaging(),{
		vapidKey: "BKsuekAop7EQ1sMt3bfu-fNgZx5qbFeEMA522jpvR9YopeSgZlOvxq25VdN_6P8RXNz7Fxdj-xYFfnl38ZMApuw",
	});

	return token
}

export const loginUser = async (mail,password) => {

	const auth = getAuth();
	signInWithEmailAndPassword(auth, mail, password)
	.then((userCredential) => {
		// Signed in 
		const user = userCredential.user;
		console.log(user)
		// ...
	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorMessage)
	});
}

export const initUser = async () => {
	const auth = getAuth()
	onAuthStateChanged(auth, (user) => {
		if(user) {
			const uid = user.uid
			console.log(user)
		}
	})
}

// export const useDatabase = () => {
// 	const database = getDatabase();

// 	return database
// } 