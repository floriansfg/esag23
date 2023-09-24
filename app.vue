<template>
  <div>
    <VitePwaManifest />
	<NuxtPage/>
	<Nav/>
  </div>
</template>

<style lang="scss">

@import "bootstrap/scss/bootstrap";

@font-face {
	font-family: 'SuperMario';
	src: url(/SuperMario256.ttf);
}

body {
	margin: 0;
	font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	background: #293E4E;
	display: flex;
	justify-content: center;
}

h1 {
	font-family: 'SuperMario';
	color: #FC9459;
	text-align: center;
}
</style>