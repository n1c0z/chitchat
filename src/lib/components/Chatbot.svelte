<script lang="ts">
	import { useChat } from 'ai/svelte';
	import Bubble from '$lib/components/Bubble.svelte';

	const { input, handleSubmit, messages } = useChat();

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;
	let scrollToDiv: HTMLDivElement;

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
		}, 100);
	}
</script>

<div class="flex flex-col pt-4 w-full items-center gap-4 text-white">
	<div
		class="h-[60vh] bg-black bg-opacity-70 w-full rounded-md p-5 overflow-y-auto flex flex-col gap-4"
	>
		<div class="flex flex-col gap-2">
			{#each $messages as message}
				<Bubble type={message.role} message={message.content} />
			{/each}
			{#if answer}
				<Bubble type="assistant" message={answer} />
			{/if}
			{#if loading}
				<Bubble type="assistant" message="Loading.." />
			{/if}
		</div>
		<div class="" bind:this={scrollToDiv} />
	</div>
	<form
		class="flex w-full bg-black bg-opacity-70 rounded-md gap-4 p-5"
		on:submit|preventDefault={handleSubmit}
	>
		<input
			type="text"
			class="input input-bordered bg-zinc-900 w-full appearance-none border border-solid border-zinc-600 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
			bind:value={$input}
		/>
		<button
			type="submit"
			class="btn btn-accent shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
		>
			Send
		</button>
	</form>
</div>
