<template>
	admin
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
			selectedDay: null
		}
	},
	mounted() {
		const db = getDatabase()
		onValue(ref(db, 'teams'), (snapshot) => {
			this.teams = snapshot.val();
			this.teams = this.teams.sort((a, b) => a.points < b.points ? 1 : -1);
			
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
		addPoints() {
			const db = getDatabase();
			getAuth().onAuthStateChanged(function(user) {
				console.log(user)
			
			});
			const postListRef = ref(db, 'pointEntries');
			const newPostRef = push(postListRef);
			set(newPostRef, {
				note: 'test',
				points: this.points,
				team: this.selectedTeam,
				time: 0
			});
		}
	}
}
</script>