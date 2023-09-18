<template>
	<div v-if="useState('loggedIn').value">
	<button @click="signOut()">Abmelden</button>
	<button @click="showAddpoints=true">Punkte</button>
	<Modal :show="showAddpoints" @close="showAddpoints=false">
		<form @submit.prevent="addPoints()" class="loginForm">
                <div class="form-group">
					<select class="form-select" v-model="selectedDay">
						<option v-for="day in days" :value="day">
							{{ day }}
						</option>
                	</select>
					<select class="form-select" v-model="selectedTeam">
						<option v-for="(team,index) in teams" :value="index">
							{{ team.name }}
						</option>
                	</select>
                    <input type="number" step="10" class="form-control" id="passwordInput" v-model="points"/>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                </div>
				<button type="submit" class="btn btn-primary">Add</button>
            </form>
	</Modal>
	<button @click="sendNotification()">Send Notification</button>
	</div>
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
export default {
	data() {
		return {
			showAddpoints: false,
			teams: [],
			days: ['Montag','Dienstag','Mittwoch','Donnerstag'],
			points: 0,
			selectedTeam: null,
			selectedDay: null,
			loggedIn: null
		}
	},
	mounted() {
		const db = getDatabase()
		onValue(ref(db, 'teams'), (snapshot) => {
			this.teams = snapshot.val();
		});
	},
	methods: {
		signOut() {
			const auth = getAuth();
			signOut(auth).then(() => {
				console.log("signed out")
			}).catch((error) => {
				console.log(error)
			});
		},
		async addPoints() {
			const db = getDatabase();
			getAuth().onAuthStateChanged(function(user) {
				console.log(user)
			
			});

			const idToken = await getAuth().currentUser.getIdToken()
			console.log(idToken)
			const {data} = await useFetch("api/addPoints", {
				method: 'POST',
				body: {
					token: idToken,
					team: this.selectedTeam,
					points: this.points,
					note: '',
					silent: false
				},
				onResponse: ({reponse}) => console.log(reponse)
			})
		},
	}
}
</script>