<template>
	<div class="settings">
		<h1>Settings</h1>
		<button @click="registerPush()">Subscribe to Updates</button>
	</div>
</template>

<script>
export default {
	methods: {
		async registerPush() {
			const permission = await Notification.requestPermission()
			console.log(permission)
			const token = await useToken()
			console.log(token)
			const {data} = await useFetch("api/subscribe", {
				method: 'POST',
				body: {
					token: token,
					topic: 'daisy'
				},
				onResponse: ({reponse}) => console.log(reponse)
			})
		}
	}
}
</script>

<style>


.settings {
	padding: 40px;
	max-width: 800px;
}

</style>