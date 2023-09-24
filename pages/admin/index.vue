<template>
	<div class="admin-panel" v-if="useState('loggedIn').value">
		<h1>Admin Panel</h1>
		
	<div class="input-group mt-5">
		<input type="text" class="form-control" placeholder="Username" v-model="username" aria-label="Username">
		<button class="btn btn-outline-secondary" type="button" @click="saveUsername()">Save</button>
	</div>
	<button class="btn btn-primary" @click="signOut()">Abmelden</button>
	<button class="btn btn-primary" @click="showAddpoints=true">Punkte hinzufügen</button>
	<PointEntries :entries="pointEntries" :teams="teams" :admin="true" />
	<Modal :show="showAddpoints" @close="showAddpoints=false">
		<form @submit.prevent="addPoints()" class="pointsForm">
                <div class="form-group">
					<select required v-if="teams" class="form-select mb-3" v-model="selectedTeam">
						<option :value="null" disabled>Team auswählen</option>
						<option v-for="(team,index) in teams" :value="team">
							{{ team.name }}
						</option>
                	</select>
                    <input required type="number" class="form-control mb-3" v-model="points"/>
					<input required type="text" class="form-control mb-3" placeholder="Grund" v-model="note"/>
					<div class="form-check mb-3">
						<input class="form-check-input" type="checkbox" v-model="silent" id="defaultCheck1">
  						<label class="form-check-label" for="defaultCheck1">Silent</label>
					</div>
                </div>
				<button type="submit" class="btn btn-primary">Hinzufügen</button>
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
			points: 0,
			selectedTeam: null,
			note: null,
			username: null,
			silent: false
		}
	},
	mounted() {
		const db = getDatabase()
		onValue(ref(db, 'teams'), (snapshot) => {
			this.teams = snapshot.val();
		});
		onValue(ref(db, 'pointEntries'), (snapshot) => {
			this.pointEntries = Object.values(snapshot.val()).sort((a,b) => new Date(a.time) - new Date(b.time)).reverse()
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
			await useFetch("api/addPoints", {
				method: 'POST',
				body: {
					token: idToken,
					team: this.selectedTeam.id,
					points: this.points,
					note: this.note,
					silent: this.silent
				}
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

.pointsForm {
    padding: 35px 50px;
    background: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 350px;
	border-radius: 10px;
	font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
;
}
.input-group {
	width: 80%;
}
</style>