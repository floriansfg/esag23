<template>
	<div class="scoreboard">
		<h1>Scoreboard</h1>
		<div class="teams">
			<div class="team" v-for="team in teams">
				<img class="icon" :src="team.icon" alt=""/>
				<div>
					<span>{{ team.name }}</span>
					<span>{{ team.points }} P</span>
				</div>
			</div>
		</div>
	</div>
	<div class="pointEntries">
		<h1>History</h1>
		<table class="entries">
			<thead>
				<tr>
				<th>Team</th>
				<th>Punkte</th>
				<th>Zeit</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="entry in pointEntries" @click="showEntry=entry">
					<td><img class="icon" :src="teams[entry.team].icon" alt=""/></td>
					<td :style="{color: entry.points>0?'#66B143':'#CF2C2C'}">{{(entry.points>0 ? '+' : '') + entry.points}}</td>
					<td>{{ entry.time }}</td>
					<Modal :show="showEntry===entry" @close="close()" buttonColor="white">
						<div class="eventDetail">
							<img class="icon" :src="teams[entry.team].icon">
							<h4 :style="{color: entry.points>0?'#66B143':'#CF2C2C'}">{{(entry.points>0 ? '+' : '') + entry.points}}</h4>
							<p>{{ entry.note }}</p>
						</div>
					</Modal>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";
export default {
	data() {
		return {
			teams: [],
			pointEntries: [],
			showEntry: null
		}
	},
	mounted() {
		const db = getDatabase()
		onValue(ref(db, 'teams'), (snapshot) => {
			this.teams = snapshot.val();
			this.teams = this.teams.sort((a, b) => a.points < b.points ? 1 : -1);
			
		});

		onValue(ref(db, 'pointEntries'), (snapshot) => {
			this.pointEntries = snapshot.val();
			// console.log(this.pointEntries)
		});

		// onValue(ref(db, 'pointEntries'), (snapshot) => {
		// 	this.pointEntries = []
			
		// 	snapshot.forEach((childSnapshot) => {
		// 		const childKey = childSnapshot.key;
		// 		const childData = childSnapshot.val();
		// 		this.pointEntries.push(childData)
		// 	});
		// });
	},
	methods: {
		close() {
			this.showEntry = false
		}
	}
}
</script>

<style lang="scss" scoped>

.scoreboard, .pointEntries {
	padding: 40px;
	width: 100vw;
	max-width: 800px;
}

h1 {
	color: #FC9459;
	text-align: center;
}
.teams {
	display: flex;
	flex-direction: column;
	width: 100%;
	.team {
		display: flex;
		align-items: center;
		background: #3F5769;
		border-radius: 20px;
		margin-bottom: 30px;
		.icon {
			width: 45px;
			height: 45px;
			object-fit: cover;
			border: solid 6px #FCB759;
			border-radius: 100%;
			z-index: 5;
			background: white;
		}
		div {
			padding: 8px 20px;
			margin: 5px;
			padding-left: 40px;
			margin-left: -30px;
			border-radius: 50px;
			color: #736C5A;
			font-size: 15px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			color: #FC9459;
			font-size: 20px;
		}
	}
}

.entries {
	width: 100%;
	border-collapse: separate;
	border-spacing: 0 15px;
	color: #FC9459;
	font-family: 'Avenir';
	font-weight: 1000;
	td, th {
		padding: 0px 15px;
	}
	td {
		height: 50px;
		background: #3F5769;
		font-size: 20px;
		&:first-child {
			border-radius: 20px 0px 0px 20px;
		}
		&:last-child {
			border-radius: 0 20px 20px 0;
		}
		img {
			width: 60px;
			height: 60px;
			object-fit: cover;
			border-radius: 100%;
		}
	}
	th {
		text-align: left;
	}
}

.eventDetail {
	width: 200px;
	padding: 30px;
	display: flex;
	flex-direction: column;
	background: #3F5769;
	text-align: center;
	.icon {
		left: 0;
		right: 0;
		margin: auto;
		width: 150px;
		object-fit: cover;
	}
	h4 {
		font-family: 'SuperMario';
		font-size: 25px;
	}
}
</style>