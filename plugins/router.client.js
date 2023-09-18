import { getAuth, onAuthStateChanged} from "firebase/auth";


export default defineNuxtPlugin(nuxtApp => {

	const router = useRouter();
	router.beforeEach(async (to) => {
		if (isAdminRoute(to) && !(await getCurrentUser())) {
			return '/admin/login'
		}
	  })

})

function getCurrentUser() {
	return new Promise((resolve, reject) => {
	  const unsubscribe = onAuthStateChanged(
		getAuth(),
		(user) => {
			useState('loggedIn').value = (user != null)	
		  unsubscribe()
		  resolve(user)
		},
		reject
	  )
	})
  }


  function isAdminRoute(route) {
	if (route.matched.some((record) => record.path == '/admin')) {
	  return true
	}
  }