import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";

export default defineEventHandler(async (event) => {

	const apps = getApps()
	const app = !apps.length ? initializeApp({
		credential: applicationDefault()
	}):apps;

	event.context.firebase = app
})