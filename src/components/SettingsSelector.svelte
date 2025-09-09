<script lang="ts">
	import { storage } from '$lib/storage';
	import Toggle from './Toggle.svelte';

	const { editable = true } = $props();
</script>

<div class="settings-selector" data-editable={editable}>
	<div class="hard-mode">
		<span>하드 모드</span>
		<div class="toggle-container">
			<Toggle bind:value={$storage.hardMode} disabled={!editable} />
		</div>
	</div>
</div>

<style>
	.settings-selector {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 50px;
		align-items: center;
		transition: opacity 0.3s ease;
	}

	[data-editable='false'] {
		opacity: 0.5;
		cursor: not-allowed;

		& * {
			pointer-events: none;
		}
	}

	img {
		width: 32px;
		height: 32px;
	}

	.settings-selector > div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;

		& > span {
			font-weight: bold;
			text-transform: capitalize;
		}

		& > div {
			display: flex;
			align-items: center;
			gap: 10px;
		}
	}

	label,
	input {
		cursor: pointer;
	}

	input {
		width: 16px;
		height: 16px;
	}

	.toggle-container {
		height: 32px;
	}

	@media screen and (max-width: 600px) {
		.settings-selector {
			gap: 20px;
			flex-wrap: wrap;
		}
	}
</style>
