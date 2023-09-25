<template>
	<div v-if="useState('loggedIn').value==false" class="formWrapper">
	<form @submit.prevent="submit" class="loginForm">
				<svg viewBox="0 0 34 41" class="lockIcon" xmlns="http://www.w3.org/2000/svg" fill="#304C5C">
					<path d="M32.0002 18.4503H30.0003V13.3252C30.0003 5.94521 24.2003 0 17 0C9.79975 0 3.99969 5.94503 3.99969 13.3252V18.4503H1.99984C0.899796 18.4503 0 19.3726 0 20.5001V38.9502C0 40.0777 0.89985 41 1.99984 41H32.0002C33.1002 41 34 40.0777 34 38.9502V20.5001C34 19.3726 33.1002 18.4503 32.0002 18.4503ZM7.99991 13.3252C7.99991 8.20022 11.9996 4.10057 16.9996 4.10057C21.9997 4.10057 25.9994 8.20022 25.9994 13.3252V18.4503H7.99919L7.99991 13.3252Z"/>
				</svg>
                <div class="form-group">
					<input type="email" class="form-control" id="nameInput" placeholder="User" v-model="mail"/>
                    <input type="password" class="form-control" id="passwordInput" placeholder="Password" v-model="password"/>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                </div>
				<button type="submit" class="btn btn-primary" @click="submit()">Anmelden</button>
            </form>
	</div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
	data() {
		return {
			mail: '',
			password: ''
		}
	},
	methods: {
		async submit() {
			const auth = getAuth();
			signInWithEmailAndPassword(auth, this.mail, this.password)
			.then(async (userCredential) => {
				// Signed in 
				const user = userCredential.user;
				await navigateTo('/admin')
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage)
			});
		}
	}
}
</script>

<style lang="scss">

.formWrapper {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.loginForm {
    padding: 35px 50px;
    background: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 350px;
	border-radius: 10px;
	.lockIcon {
		width: 30px;
		margin: 30px
	}
	.form-group {
		width: 100%;
		margin: 10px 0;
	}

	button {
		margin: 30px 0;
	}
}

.info {
	display: flex;
	align-items: center;
	svg {
		margin: 10px;
		width: 20px
	}
	span {
		font-size: 10pt;
		width: 200px;
		color: #7E7E7E;
	}
}
</style>