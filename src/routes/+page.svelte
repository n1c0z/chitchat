<!-- src/routes/+page.svelte -->
<script>
	import { useChat } from 'ai/svelte';
	const { input, handleSubmit, messages } = useChat();
</script>

<div>
	<ul>
		{#each $messages as message}
			<li>{message.role}: {message.content}</li>
		{/each}
	</ul>
	<form on:submit={handleSubmit}>
		<label>
			Say something...
			<input bind:value={$input} />
		</label>
		<button type="submit">Send</button>
	</form>
</div>
