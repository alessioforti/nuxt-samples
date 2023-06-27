<script setup>
import PocketBase from 'pocketbase'
const pb = new PocketBase('http://127.0.0.1:8090');

definePageMeta({
	middleware: 'auth'
})

const logout = () => {
	pb.authStore.clear()
	navigateTo('/login')
}
</script>
<template>
	<div class="w-full h-screen grid place-content-center">
		<div class="text-center">
			<h2 class="text-2xl font-bold mb-10">Protected page</h2>

			<button @click="logout" class="btn">
				Logout
			</button>
		</div>
	</div>
</template>