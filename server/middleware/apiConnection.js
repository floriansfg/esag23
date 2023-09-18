import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";

export default defineEventHandler(async (event) => {

	const apps = getApps()
	const app = !apps.length ? initializeApp({
		credential: applicationDefault(),
		databaseURL: "https://esag-f0e87-default-rtdb.europe-west1.firebasedatabase.app/",
	}):apps;

	event.context.firebase = app
})