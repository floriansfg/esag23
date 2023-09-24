<template>
	<svg class="menuButton" @click="open=!open" viewBox="0 0 40 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
		<path d="M3 3H37" stroke="white" stroke-width="6" stroke-linecap="round"/>
		<path d="M3 15H27" stroke="white" stroke-width="6" stroke-linecap="round"/>
		<path d="M3 27H31" stroke="white" stroke-width="6" stroke-linecap="round"/>
	</svg>
	<div class="nav" :class="{open: open}">
		<NuxtLink to="/">Home</NuxtLink>
		<NuxtLink to="/scoreboard">Scoreboard</NuxtLink>
		<NuxtLink to="/settings">Settings</NuxtLink>
		<NuxtLink v-if="useState('loggedIn').value" to="/admin">Admin</NuxtLink>
		<NuxtLink v-else to="/admin/login">Login</NuxtLink>
	</div>

	<div v-if="open" @click="open=false" class="backdrop"></div>
</template>

<script>
export default {
	data() {
		return {
			open: false
		}
	},
	watch: {
        '$route' () {
            this.open = false
        }
    }
}
</script>

<style scoped>
.menuButton {
	position: fixed;
	left: 20px;
	top: 20px;
	width: 40px;
	z-index: 40;
}

.backdrop {
	position: fixed;
	background-color: rgb(39, 42, 42);
	opacity: 0.6;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 49;
}

.nav {
	height: 100%;
	display: flex;
	flex-direction: column;
	position: fixed;
	background: #3F5769;
	z-index: 50;
	top: 0;
	left: 0;
	padding: 50px;
	font-size: 40px;
	transform: translateX(-100%);
	transition: all 0.2s;
	font-family: 'SuperMario';
}

.nav.open {
	transform: translateX(0);
}

a {
	color: white;
	text-decoration: none;
}
</style>