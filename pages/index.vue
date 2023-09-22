<template>
	<Overlay v-if="platforms" :teams="teams"/>
	<Map v-if="teams && platforms" :teams="teams" :platforms="platforms"/>
</template>
<script>
import { getDatabase, ref, onValue } from "firebase/database";
export default {
	data() {
		return {
			teams: null,
			platforms: null
		}
	},
	mounted() {
		const db = getDatabase()
		onValue(ref(db, '/'), (snapshot) => {
			const data = snapshot.val();
			this.teams = useTeams(data.teams,data.pointEntries)
			this.platforms = data.maps[0].platforms
		});
	}
}
</script>