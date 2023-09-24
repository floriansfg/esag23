import { getMessaging } from "firebase-admin/messaging";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const idToken = body.token
	
	getAuth().verifyIdToken(idToken)
	.then(async (decodedToken) => {
		const uid = decodedToken.uid;
		const user = await getAuth().getUser(uid)
		const username = user.displayName ? user.displayName : user.email
		addPoints(body.team,body.points,body.note,username,uid)

		if(!body.silent) sendNotification("Update",body.points+" für dein Team",body.team)
		console.log(body.points + " Points added to "+body.team)
	}).catch((error) => {
		console.log(error)
	});

	
})

function addPoints(team,points,note,user,uid) {
	var db = getDatabase();
	const ref = db.ref('pointEntries')
	const newPostRef = ref.push();
	newPostRef.set({
		note: note,
		points: points,
		team: team,
		user: user,
		uid: uid,
		time: new Date().toJSON()
	},(error) => {
		if (error) {
		  console.log('Data could not be saved.' + error);
		} else {
		  console.log('Data saved successfully.');
		}
	  });
}

function sendNotification(title,body,topic) {
	const message = {
		notification: {
			title: title,
			body: body
		},
		topic: topic
	};

	// Send a message to devices subscribed to the provided topic.
	const messaging = getMessaging();
	messaging.send(message)
	.then((response) => {
		// Response is a message ID string.
		console.log('Successfully sent message to '+topic+':', response);
	})
	.catch((error) => {
		console.log('Error sending message:', error);
	});
}