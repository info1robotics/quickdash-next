<script lang="ts">
	async function resetPassword() {
		const response = await fetch('/api/resetpassword', {
			method: 'post',
			body: JSON.stringify({
			query: {
				access_token: "6789",
				new_password: "67986", 
			}
		})
	});
	}
</script>

