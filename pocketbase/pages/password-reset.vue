<script setup>
import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090');

const email = ref('')
const showError = ref(false)
const showEmailSent = ref(false)


const sendResetLink = async () => {
	await pb.collection('users').requestPasswordReset(
		email.value,
	).then(() => {
		showEmailSent.value = true
	}).catch(e => {
		showError.value = true
	})
}


const buttonDisabled = computed(() => {
	const r = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
	const isEmail = email.value.search(r)

	if (isEmail == 0) {
		return false
	}

	return true
})

</script>
<template>
	<div class="container w-full md:w-[450px] flex min-h-full justify-center py-14">
		<div class="w-full flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border-[1px] rounded-2xl shadow-lg">
			<div class="sm:mx-auto sm:w-full sm:max-w-sm">

				<div v-show="showError" class="px-5 py-2.5 mb-10 text-sm text-red-700 bg-red-200 rounded-md
				 border-red-600	border-[1px]">
					Something went wrong. <br>Please try again.
				</div>

				<div v-show="showEmailSent" class="px-5 py-2.5 mb-10 text-sm text-emerald-700 bg-emerald-200 rounded-md
				 border-emerald-600 border-[1px]">
					Please check your inbox.
				</div>

				<h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Reset your password
				</h2>

			</div>
	
			<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form class="space-y-6" @submit.prevent="sendResetLink">
					<div>
						<div class="w-full flex flex-wrap justify-between items-center">
							<label for="email" class="block text-sm font-medium leading-6 text-gray-900">
								Email
							</label>
						</div>
						<div class="mt-2">
							<input id="email" name="email" type="email" autocomplete="email" required="" 
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
							ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
							focus:ring-blue-600	sm:text-sm sm:leading-6" v-model="email" />
						</div>
					</div>
			
					<div>
						<button type="submit" class="flex w-full justify-center items-center rounded-md bg-blue-600 
						px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 
						focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
						 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400 
						transition-all duration-200" :disabled="buttonDisabled">Send reset link</button>
					</div>
				</form>

				<p class="mt-10 text-center text-sm text-gray-500">
					<NuxtLink to="/login" class="font-semibold leading-6 text-blue-600 hover:text-blue-500">
						Login
					</NuxtLink>
					or
					<NuxtLink to="/signup" class="font-semibold leading-6 text-blue-600 hover:text-blue-500">
						Signup
					</NuxtLink>
				</p>
			</div>
		</div>
	</div>
</template>