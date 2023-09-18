import { getMessaging } from "firebase-admin/messaging";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const idToken = body.token
	console.log(idToken)
	getAuth().verifyIdToken(idToken)
	.then((decodedToken) => {
		const uid = decodedToken.uid;
		console.log(body)
		addPoints(body.team,body.points,body.note)

		if(!body.secret) sendNotification()

	}).catch((error) => {
		console.log(error)
	});

	
})

function addPoints(team,points,note) {
	var db = getDatabase();
	db.ref('pointEntries').push({
		note: note,
		points: points,
		team: team,
		time: 0
	});
}

function sendNotification() {
	const message = {
		notification: {
			title: 'Neue Punkte',
			body: 'Yayyy'
		},
		topic: 'daisy'
	};

	// Send a message to devices subscribed to the provided topic.
	const messaging = getMessaging();
	messaging.send(message)
	.then((response) => {
		// Response is a message ID string.
		console.log('Successfully sent message:', response);
	})
	.catch((error) => {
		console.log('Error sending message:', error);
	});
}