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
	font-family: 'SuperMario';
	background: #293E4E;
	display: flex;
	justify-content: center;
}

h1 {
	color: #FC9459;
	text-align: center;
}
</style>