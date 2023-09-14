import { getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
	console.log(getAuth().currentUser)
	useState('loggedIn').value = (getAuth().currentUser != null)
	if(isAdminRoute(to) && !useState('loggedIn').value) {
		return navigateTo("/admin/login");
	}
	console.log("Logged In:"+useState('loggedIn').value)
})

function isAdminRoute(route) {
	if (route.matched.some((record) => record.path == '/admin')) {
	  return true
	}
  }