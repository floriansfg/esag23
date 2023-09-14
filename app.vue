<template>
  <div>
    <VitePwaManifest />
	<!-- <select class="dropdown" v-model="selectedTeam">
       <option v-for="team in teams" :value="team.name">{{ team.name }}</option>
    </select>
	<button @click="registerPush()">Subscribe</button> -->
	<NuxtPage/>
	<Nav/>
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";

export default {
	data() {
		return {
			teams: [],
			selectedTeam: null
		}
	},
	mounted() {
		const db = getDatabase()
		// console.log(db)
		// const teamsRef = db.ref('teams')
		// const teams = await teamsRef.once('value')
		// const teamsRef = ref(db,'teams')
		const teamRef = ref(db, 'teams');
		onValue(teamRef, (snapshot) => {
			const data = snapshot.val();
			this.teams = data
		});
	},
	methods: {
		async registerPush() {
			const permission = await Notification.requestPermission()
			console.log(this.selectedTeam)
			const token = await useToken()
			console.log(token)
			const {data} = await useFetch("api/subscribe", {
				method: 'POST',
				body: {
					token: token,
					topic: this.selectedTeam
				},
				onResponse: ({reponse}) => console.log(reponse)
			})
		}
	}
}
</script>

<style lang="scss">

@import "bootstrap/scss/bootstrap";

@font-face {
	font-family: 'SuperMario';
	src: url(/SuperMario256.ttf);
}

body {
	margin: 0;
	font-family: 'SuperMario';
	background: #293E4E;
	display: flex;
	justify-content: center;
}
</style>