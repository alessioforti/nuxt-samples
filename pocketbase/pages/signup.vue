<script setup>
import PocketBase from 'pocketbase'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const pb = new PocketBase('http://127.0.0.1:8090');

const email = ref('')
const showEmailError = ref(false)
const showEmailVerificationSent = ref(false)

const password = ref('')
const confirmPassword = ref('')

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const loading = ref(false)


const signup = async () => {
	loading.value = true

	const user = await pb.collection('users').create({
		'email': email.value,
		'password': password.value,
		'passwordConfirm': confirmPassword.value
	}).then( async () => {
		await pb.collection('users').requestVerification(email.value).then(() => {
			showEmailVerificationSent.value = true
			email.value = ''
			password.value = '',
			confirmPassword.value = '',
			loading.value = false
		})
	}).catch(e => console.log(e))

}


const togglePassword = () => {
	showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
	showConfirmPassword.value = !showConfirmPassword.value
}


const buttonDisabled = computed(() => {
	const r = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
	const isEmail = email.value.search(r)

	if (isEmail == 0 && password.value.length >= 6) {
		return false
	}

	return true
})

</script>
<template>
	<div class="container w-full md:w-[450px] flex min-h-full justify-center py-14">
		<div class="w-full flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border-[1px] rounded-2xl shadow-lg">

			<div v-show="showEmailVerificationSent" class="px-5 py-2.5 mb-10 text-sm text-emerald-700 bg-emerald-200 rounded-md border-emerald-600 border-[1px]">
				We sent you a verification email. Please check your inbox.
			</div>

			<div class="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign Up
				</h2>
			</div>
	
			<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form class="space-y-6" @submit.prevent="signup">
					<div>
						<div class="w-full flex flex-wrap justify-between items-center">
							<label for="email" class="block text-sm font-medium leading-6 text-gray-900">
								Email
							</label>
							<p class="text-xs text-red-500 transition-all duration-1000" v-show="showEmailError">
								Email non valida
							</p>
						</div>
						<div class="mt-2">
							<input id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" v-model="email" />
						</div>
					</div>

					<div>
						<div class="w-full flex flex-wrap justify-between items-center">
							<label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
							<p class="text-xs text-blue-500">
								Min. 6 characters
							</p>
						</div>
						<div class="mt-2 relative">
							<input id="password" name="password" :type="[ showPassword ? 'text' : 'password' ]" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" v-model.trim="password" />

							<div @click="togglePassword" class="absolute top-1 right-1 p-1 cursor-pointer text-gray-500">
								<EyeSlashIcon v-if="showPassword" class="w-5 h-5 text-blue-700" />
								<EyeIcon v-else class="w-5 h-5" />
							</div>
						</div>
					</div>

					<div>
						<div class="w-full flex flex-wrap justify-between items-center">
							<label for="password-confirm" class="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
						</div>
						<div class="mt-2 relative">
							<input id="password-confirm" name="password-confirm" :type="[ showConfirmPassword ? 'text' : 'password' ]" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" v-model.trim="confirmPassword" />

							<div @click="toggleConfirmPassword" class="absolute top-1 right-1 p-1 cursor-pointer text-gray-500">
								<EyeSlashIcon v-if="showConfirmPassword" class="w-5 h-5 text-blue-700" />
								<EyeIcon v-else class="w-5 h-5" />
							</div>
						</div>
					</div>
			
					<div class="pt-7">
						<button type="submit" class="flex w-full justify-center items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400 transition-all duration-200" :disabled="buttonDisabled">
							<div v-if="loading" class="w-3 h-3 my-1.5 rounded-full bg-white animate-ping"></div>
							<span v-else>Sign Up</span>
						</button>
					</div>
				</form>

				<p class="mt-10 text-center text-sm text-gray-500">
					Already have an account?
					{{ ' ' }}
					<NuxtLink to="/login" class="font-semibold leading-6 text-blue-600 hover:text-blue-500">
						Log In
					</NuxtLink>
				</p>
			</div>
		</div>
	</div>
</template>