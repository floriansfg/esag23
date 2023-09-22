<template>
	<div class="imgWrapper">
		<img class="nightMap" src="/map_normal_night.png">
		<img class="dayMap" id="map_day" src="/map_normal_day.png">
		<canvas id="canvas" ref="map" width="1920" height="1529"></canvas>
		<div class="marker" v-for="(team,index) in teams" :style="markers[index]">
			<img :src="team.icon" class="icon" alt="">
			<svg viewBox="0 0 52 63" xmlns="http://www.w3.org/2000/svg">
				<path d="M51.1735 25.2607C51.1735 35.4853 42.7532 45.2922 42.7532 45.2922C42.7532 45.2922 29.5214 62.5504 25.9128 62.5504C22.3041 62.5504 9.07228 45.2922 9.07228 45.2922C9.07228 45.2922 0.652039 35.4853 0.652039 25.2607C0.652039 11.3096 11.9616 0 25.9128 0C39.8639 0 51.1735 11.3096 51.1735 25.2607Z" fill="white"/>
			</svg>
		</div>
	</div>
</template>

<script>

export default {
	props: ['teams','platforms'],
	data() {
		return {
			mapSize: {
				width: 0,
				height: 0,
				x: 0,
				y: 0
			},
			clickedMarker: null
		}
	},
	computed: {
		markers() {
			let teamMarkers = this.teams.map(team => {
				
				let platform = this.getPlatform(team.points)
			
				return {
					left: (this.mapSize.width*platform.x)+(this.mapSize.x), 
					top: (this.mapSize.height*platform.y)+(this.mapSize.y)
				}
			})

			teamMarkers.map(marker => {
				let duplicates = teamMarkers.filter(el => el.left == marker.left && el.top == marker.top)
				duplicates.map((el,index) => {
					if(marker != this.clickedMarker) el.top -= index*34
					// el.zIndex = duplicates.length - index
				})
			})

			teamMarkers.map(el => {
				el.left += "px",
				el.top += "px"
			})

			return teamMarkers
		},
	},
	async mounted() {
		this.handleResize()
		window.addEventListener('resize', this.handleResize);
	},
  	unmounted() {
		window.removeEventListener('resize', this.handleResize);
	},
  	methods: {
		handleResize() {
			const map = this.$refs.map
			this.mapSize = this.getObjectFitSize(false, window.innerWidth, window.innerHeight, map.width, map.height)
		},
		getObjectFitSize(contains, containerWidth, containerHeight, width, height){
			var doRatio = width / height;
			var cRatio = containerWidth / containerHeight;
			var targetWidth = 0;
			var targetHeight = 0;
			var test = contains ? (doRatio > cRatio) : (doRatio < cRatio);

			if (test) {
				targetWidth = containerWidth;
				targetHeight = targetWidth / doRatio;
			} else {
				targetHeight = containerHeight;
				targetWidth = targetHeight * doRatio;
			}

			return {
				width: targetWidth,
				height: targetHeight,
				x: (containerWidth - targetWidth) / 2,
				y: (containerHeight - targetHeight) / 2
			};
		},
		getPlatform(points) {
			let platform = this.platforms.find(platform => points <= platform.points);
			if(!platform) platform = this.platforms.slice(-1)

			return platform
		}
  	},
	
}
</script>

<style scoped>

.platform {
	background-color: red;
	width: 5px;
	height: 5px;
	position: fixed;
}

.imgWrapper {
	position: relative;
	width: 100vw;
	height: 100vh;
	min-height: -webkit-fill-available;
	/* background: url(/dayMap.gif); */
	background-size: cover;
	overflow: hidden;
}

.imgWrapper img, .imgWrapper canvas {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.dayMap {
	animation: lightCycle 10s ease-in-out 0s infinite alternate;
}

@keyframes lightCycle {
	from {opacity: 1;}
	to {opacity: 0;}
}

.marker {
	z-index: 50;
	position: fixed;
	height: 40px;
	width: 40px;
	transform: translate(-18px,-45px);
	/* filter: drop-shadow(0 0 15px #0000006c); */
	transition: margin 0.2s;
}

.marker:hover {
	margin-top: -5px;
}

.marker svg {
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	z-index: 10;
	transform: translate(0,-45px);
}

.marker img {
	object-fit: contain;
	position: relative;
	transform: scale(1.5);
	z-index: 51;
	width: 100%;
	height: 100%;
}
</style>