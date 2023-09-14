// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB3-_9L4zdAgIbdeQGCH3ZeVqWFL0bnjVM",
  authDomain: "esag-f0e87.firebaseapp.com",
  projectId: "esag-f0e87",
  storageBucket: "esag-f0e87.appspot.com",
  messagingSenderId: "239759908383",
  appId: "1:239759908383:web:3d91bcebf896fae8e3ff2a",
  databaseURL: "https://esag-f0e87-default-rtdb.europe-west1.firebasedatabase.app/",
};

export default defineNuxtPlugin(nuxtApp => {

	const apps = getApps()
	const app = !apps.length ? initializeApp(firebaseConfig):apps;

	return {
		provide: {
		  	firebaseApp: app
		}
	}
})
