import { getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
	var loggedIn = false;

	await getAuth().onAuthStateChanged(async (user) => {
		if (user) {
			loggedIn = true
			useState('loggedIn').value = loggedIn	
		} else {
		}
	});
})