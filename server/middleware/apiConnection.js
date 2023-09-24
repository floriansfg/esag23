import { initializeApp, getApps, cert } from "firebase-admin/app";

export default defineEventHandler(async (event) => {

	const runtimeConfig = useRuntimeConfig()
	const apps = getApps()
	const serviceAccount = runtimeConfig.FIREBASE_SERVICE_ACCOUNT_KEY
	const app = !apps.length ? initializeApp({
		credential: cert(serviceAccount),
		databaseURL: "https://esag-f0e87-default-rtdb.europe-west1.firebasedatabase.app/",
	}):apps;

	event.context.firebase = app
})