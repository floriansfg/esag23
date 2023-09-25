import { getMessaging, getToken } from "firebase/messaging";

export const useMessaging = () => {
	const { $firebaseApp } = useNuxtApp()
	const messaging = getMessaging($firebaseApp);
	return messaging
}

export const useToken = async () => {
	
	let token = await getToken(useMessaging(),{
		vapidKey: "BKsuekAop7EQ1sMt3bfu-fNgZx5qbFeEMA522jpvR9YopeSgZlOvxq25VdN_6P8RXNz7Fxdj-xYFfnl38ZMApuw",
	});

	return token
}

export const useTeams = (teams,entries) => {
	teams.map((team,index) => {
		const teamEntries = Object.values(entries).filter(entry => entry.team == index)
		team.points = teamEntries.reduce((points, entry) => points+=entry.points,0)
	})
	return teams
}

// export const useDatabase = () => {
// 	const database = getDatabase();

// 	return database
// } 