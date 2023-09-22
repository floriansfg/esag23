import { getMessaging } from "firebase-admin/messaging";
import { getDatabase } from "firebase-admin/database";

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const messaging = getMessaging();

	const db = getDatabase()
	let teams = null
	db.ref('/teams').on('value', (snapshot) => {
		teams = snapshot.val();
		teams.map(team => messaging.unsubscribeFromTopic([body.token],team.id))

		messaging.subscribeToTopic([body.token], body.topic)
		.then((response) => {
			console.log('Successfully subscribed to topic:', response);
		})
		.catch((error) => {
			console.log('Error subscribing to topic:', error);
		});
	});

	console.log(body)
})