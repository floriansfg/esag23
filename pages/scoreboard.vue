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
	<PointEntries :entries="pointEntries" :teams="teams" :admin="false"/>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";
export default {
	data() {
		return {
			teams: [],
			pointEntries: []
		}
	},
	mounted() {
		const db = getDatabase()
		onValue(ref(db, '/'), (snapshot) => {
			const data = snapshot.val();
			this.teams = useTeams(data.teams,data.pointEntries).sort((a, b) => a.points < b.points ? 1 : -1);
			this.pointEntries = Object.values(data.pointEntries).sort((a,b) => new Date(a.time) - new Date(b.time)).reverse()
		});
	},
}
</script>

<style lang="scss" scoped>

.scoreboard {
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
			height: 55px;
			object-fit: cover;
			border: solid 6px #FCB759;
			border-radius: 100%;
			z-index: 5;
			background: white;
			margin-left: -5px;
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


</style>