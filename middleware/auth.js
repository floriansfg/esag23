import { getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
	var loggedIn = false;

	const user = await getAuth().currentUser

	await getAuth().onAuthStateChanged(async (user) => {
		if (user) {
			loggedIn = true
			useState('loggedIn').value = loggedIn	
		} else {
		}
	});

	// if(!loggedIn && isAdminRoute(to)) return navigateTo("/admin/login");
})

function isAdminRoute(route) {
	if (route.matched.some((record) => record.path == '/admin')) {
	  return true
	}
  }