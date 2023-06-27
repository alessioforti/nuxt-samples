<template>
	<div class="w-full h-screen grid place-content-center">
		<div>
			<NuxtLink to="/signup" class="btn">
				Sign Up
			</NuxtLink>

			<NuxtLink to="/" class="btn">
				Log In
			</NuxtLink>

			<p class="mt-6 text-sm text-gray-600 text-center underline hover:text-sky-700">
				<NuxtLink to="/">
					Forgot password?
				</NuxtLink>
			</p>
		</div>
	</div>
</template>