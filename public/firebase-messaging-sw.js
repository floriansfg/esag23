self.skipWaiting();

importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

var firebaseConfig = {
	apiKey: "AIzaSyB3-_9L4zdAgIbdeQGCH3ZeVqWFL0bnjVM",
	authDomain: "esag-f0e87.firebaseapp.com",
	projectId: "esag-f0e87",
	storageBucket: "esag-f0e87.appspot.com",
	messagingSenderId: "239759908383",
	appId: "1:239759908383:web:3d91bcebf896fae8e3ff2a"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
// 	console.log('[firebase-messaging-sw.js] Received background message ', payload);
// 	const notificationTitle = payload.notification.title;
// 	const notificationOptions = {
// 		body: payload.notification.body,
// 	};
// 	// return self.registration.showNotification(notificationTitle, notificationOptions);
// });