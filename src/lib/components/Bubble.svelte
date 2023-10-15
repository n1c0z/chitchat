<script lang="ts">
	export let type: string;
	export let message: string;
</script>

<div class="chat {type === 'user' ? 'chat-end' : 'chat-start'} justify-end">
	<div class="chat-image">
		{#if type === 'user'}
			<div
				class="avatar w-10 rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
			>
				me
			</div>
		{:else}
			<div
				class="avatar w-10 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
			>
				ai
			</div>
		{/if}
	</div>
	<div class="chat-bubble {type === 'user' ? 'bg-emerald-900' : 'bg-rose-900'}">
		{message}
	</div>
</div>

<style>
	.chat {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		-moz-column-gap: 0.75rem;
		column-gap: 0.75rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}

	.chat-image {
		grid-row: span 2 / span 2;
		align-self: flex-end;
		position: relative;
		display: inline-flex;
	}
	.avatar {
		display: block;
		aspect-ratio: 1 / 1;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		font-size: 1.25em;
		color: lightyellow;
		letter-spacing: 1px;
	}

	.chat-start {
		place-items: start;
		grid-template-columns: auto 1fr;
	}

	.chat-end .chat-image {
		grid-column-start: 2;
	}

	.chat-end {
		place-items: end;
		grid-template-columns: 1fr auto;
	}

	.chat-end .chat-bubble {
		grid-column-start: 1;
		border-bottom-right-radius: 0px;
	}
	.chat-bubble {
		position: relative;
		display: block;
		width: fit-content;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		max-width: 90%;
		border-radius: 1rem;
		min-height: 2.75rem;
		min-width: 2.75rem;
	}
</style>
