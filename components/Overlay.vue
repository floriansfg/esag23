<template>
	<div class="overlay">
	<div class="pointScale">
		<div class="team" v-for="team in teams">
			<img class="icon" :src="team.icon" alt="">
			<div>
				<div>{{ team.name }}</div>
				<div>{{ team.points - team.previousPoints }} P</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props: ['teams']
}
</script>

<style scoped>

.overlay {
	width: 100vw;
	height: 100vh;
	position: fixed;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	z-index: 1;
}
.pointScale {
	padding: 20px;
	background: #FFF4DA;
	display: grid;
	grid-template-columns: repeat(2, 1fr); 
	grid-template-rows: repeat(2, 1fr); 
	grid-gap: 10px;
	border-radius: 40px;
	position: fixed;
	bottom: 20px;
	max-width: 80%;
}

.team {
	display: flex;
	align-items: center;
	max-width: 25%;
}

.team .icon {
	width: 55px;
	height: 55px;
	object-fit: cover;
	border: solid 6px #FCB759;
	border-radius: 100%;
	z-index: 5;
	background: white;
}

.team > div > div {
	background: #FFDF95;
	padding: 8px 20px;
	margin: 5px;
	padding-left: 40px;
	margin-left: -30px;
	border-radius: 50px;
	color: #736C5A;
	font-size: 15px;
	line-height: 0.7;
	max-width: 25vw;
	white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>