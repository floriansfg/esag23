<template>
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
				<tr v-if="teams" v-for="entry in entries" @click="showEntry=entry">
					<td><img class="icon" :src="teams[entry.team].icon" alt=""/></td>
					<td :style="{color: entry.points>0?'#66B143':'#CF2C2C'}">{{(entry.points>0 ? '+' : '') + entry.points}}</td>
					<td>{{ formatDate(entry.time) }}</td>
					<Modal v-if="admin" :show="showEntry===entry" @close="close()" buttonColor="white">
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
export default {
	props: ['entries','teams','admin'],
	data() {
		return {
			showEntry: null
		}
	},
	methods: {
		close() {
			this.showEntry = false
		},
		formatDate(time) {
			let date = new Date(time)
			return date.toLocaleString('de-de', {weekday: 'short'}) + ' ' + date.getHours() + ':' + date.getMinutes() + ' Uhr'
		}
	}
}
</script>
<style lang="scss" scoped>
h1 {
	color: #FC9459;
	text-align: center;
}
.pointEntries {
	padding: 40px;
	width: 100%;
	max-width: 800px;
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
		width: 33%;
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