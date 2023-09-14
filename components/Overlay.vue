<template>
	<div class="pointScale">
		<div class="team" v-for="team in teams">
			<img class="icon" :src="team.icon" alt="">
			<div>
				<div>{{ team.name }}</div>
				<div>{{ team.points }} P</div>
			</div>
		</div>
	</div>
</template>