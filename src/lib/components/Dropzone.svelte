<script lang="ts">
	import { enhance } from '$app/forms';
	const authorizedExtensions = ['.csv'];
</script>

<form
	class="w-full flex justify-between bg-black bg-opacity-70 rounded-md gap-4 p-5"
	method="POST"
	use:enhance
	enctype="multipart/form-data"
>
	<input
		class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-200 focus:outline-none dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-gray-200"
		id="file_input"
		type="file"
		name="fileToUpload"
		accept={authorizedExtensions.join(',')}
		required
	/>
	<button
		class="btn btn-accent shadow bg-teal-700 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
		type="submit">Upload</button
	>
</form>

<style>
	input::file-selector-button {
		font-weight: bold;
		color: white;
		padding: 0.5rem 1rem;
		border: thin solid #1d4ed8;
		border-radius: 3px;
		background-color: #1d4ed8;
		margin-right: 1em;
	}
</style>
