import { getMessaging } from "firebase-admin/messaging";

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const messaging = getMessaging();

	messaging.subscribeToTopic([body.token], body.topic)
	.then((response) => {
		// See the MessagingTopicManagementResponse reference documentation
		// for the contents of response.
		console.log('Successfully subscribed to topic:', response);
	})
	.catch((error) => {
		console.log('Error subscribing to topic:', error);
	});

	console.log(body)
})