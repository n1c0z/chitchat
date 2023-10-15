<script lang="ts">
	import DropFile from 'svelte-parts/DropFile.svelte';

	let fileOver = false;

	const onDrop = (files: File[]) => {
		alert(`Files: ${files.map((d) => d.name).join(', ')}`);
		fileOver = false;
	};
</script>

<DropFile {onDrop} onEnter={() => (fileOver = true)} onLeave={() => (fileOver = false)}>
	<label
		class="flex justify-center w-full h-20 bg-black bg-opacity-70 transition rounded-md cursor-pointer focus:outline-none"
	>
		<span class="flex items-center space-x-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-6 h-6 text-white"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/>
			</svg>
			<span class="font-medium text-white">
				Drop files to Attach, or
				<span class="text-purple-400 underline">browse</span>
			</span>
		</span>
		<input type="file" name="file_upload" class="hidden" />
	</label>
</DropFile>

<style>
</style>
