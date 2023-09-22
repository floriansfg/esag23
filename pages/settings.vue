<template>
	<div class="settings">
		<h1>Settings</h1>
		<div class="input-group mb-3">
			<select class="form-select" id="inputGroupSelect03" v-model="selectedTeam" aria-label="Example select with button addon">
				<option selected>Team</option>
				<option v-if="teams" v-for="(team,index) in teams" :value="team">{{ team.name }}</option>
			</select>
			<button class="btn btn-outline-secondary" type="button" @click="registerPush()">Anmelden</button>
		</div>
	</div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";

export default {
	data() {
		return {
			teams: null,
			selectedTeam: null
		}
	},
	methods: {
		async registerPush() {
			if(!this.selectedTeam) return
			await Notification.requestPermission()
			const token = await useToken()
			const {data} = await useFetch("api/subscribe", {
				method: 'POST',
				body: {
					token: token,
					topic: this.selectedTeam.id
				}
			})
		}
	},
	mounted() {
		const db = getDatabase()
		onValue(ref(db, '/teams'), (snapshot) => {
			this.teams = snapshot.val();
		});
	}
}
</script>

<style>


.settings {
	padding: 40px;
	max-width: 800px;
}

</style>