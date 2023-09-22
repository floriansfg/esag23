<template>
	<div class="admin-panel" v-if="useState('loggedIn').value">
		<h1>Admin Panel</h1>
		
	<div class="input-group mt-5">
		<input type="text" class="form-control" placeholder="Username" v-model="username" aria-label="Username">
		<button class="btn btn-outline-secondary" type="button" @click="saveUsername()">Save</button>
	</div>
	<!-- <button @click="signOut()">Abmelden</button> -->
	<button class="btn btn-primary" @click="showAddpoints=true">Punkte</button>
	<PointEntries :entries="pointEntries" :teams="teams" :admin="true" />
	<Modal :show="showAddpoints" @close="showAddpoints=false">
		<form @submit.prevent="addPoints()" class="loginForm">
                <div class="form-group">
					<select v-if="teams" class="form-select" v-model="selectedTeam">
						<option v-for="(team,index) in teams" :value="team">
							{{ team.name }}
						</option>
                	</select>
                    <input type="number" step="10" class="form-control" id="passwordInput" v-model="points"/>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                </div>
				<button type="submit" class="btn btn-primary">Add</button>
            </form>
	</Modal>
	</div>
</template>
<script>
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
export default {
	data() {
		return {
			showAddpoints: false,
			teams: null,
			pointEntries: null,
			days: ['Montag','Dienstag','Mittwoch','Donnerstag'],
			points: 0,
			selectedTeam: null,
			selectedDay: null,
			username: null
		}
	},
	mounted() {
		const db = getDatabase()
		onValue(ref(db, 'teams'), (snapshot) => {
			this.teams = snapshot.val();
		});
		onValue(ref(db, 'pointEntries'), (snapshot) => {
			this.pointEntries = snapshot.val();
		});

		getAuth().onAuthStateChanged((user) => {
			this.username = user.displayName
		});
	},
	methods: {
		signOut() {
			const auth = getAuth();
			signOut(auth).then(async () => {
				useState('loggedIn').value = false
				await navigateTo('/admin/login')
			}).catch((error) => {
				console.log(error)
			});
		},
		async addPoints() {

			const idToken = await getAuth().currentUser.getIdToken()
			console.log(idToken)
			const {data} = await useFetch("api/addPoints", {
				method: 'POST',
				body: {
					token: idToken,
					team: this.selectedTeam.id,
					points: this.points,
					note: '',
					silent: false
				},
				onResponse: ({reponse}) => console.log(reponse)
			})
		},
		saveUsername() {
			getAuth().onAuthStateChanged((user) => {
				updateProfile(user,{
					displayName: this.username
				})
			});
		}
	}
}
</script>
<style scoped>

.admin-panel {
	padding: 80px;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.input-group {
	width: 80%;
}
</style>