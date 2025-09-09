<script lang="ts">
	import type { Guess } from '$lib/models/guess.model';
	import { storage } from '$lib/storage';
	import { LINE_NAMES_BY_ID } from '$lib/utils';
	import { blur } from 'svelte/transition';

	type Props = {
		guess?: Guess;
	};
	let { guess }: Props = $props();
</script>

<div class="guess-row" transition:blur={{ duration: 200 }} data-hard={!$storage.hardMode}>
	<div class="guess-row-cell name" data-correct={guess ? guess.name.correct : 'neutral'}>
		{guess ? guess.name.value : '이름'}
	</div>
	<div
		class="guess-row-cell lines"
		title={'초록: 모든 호선 맞음 \n주황: 일부 호선 맞음 \n빨간: 맞는 호선이 없음'}
		data-correct={guess ? guess.lines.correct : 'neutral'}
	>
		{#if guess}
			{#each guess.lines.value as line (line)}
				<img src={`/images/lines/${line}.png`} alt={LINE_NAMES_BY_ID[line]} width={28} />
			{/each}
		{:else}
			호선
		{/if}
	</div>
	<div
		class="guess-row-cell distance"
		data-correct={guess ? guess.direction.correct : 'neutral'}
		data-displayed={!$storage.hardMode}
	>
		{#if guess}
			<img
				class="guess-angle"
				style:transform={`rotate(${guess.direction.value}deg)`}
				width={24}
				src="/images/1x/arrow.webp"
				srcset="/images/1x/arrow.webp 1x, /images/2x/arrow.webp 2x,/images/3x/arrow.webp 3x"
				alt="^"
			/>
		{:else}
			방향
		{/if}
	</div>
</div>

<style>
	.guess-row {
		display: grid;
		grid-template-columns: repeat(4, minmax(50px, 1fr));
		align-items: center;
		width: 800px;
		gap: 30px;
		min-height: 40px;
		margin: 10px auto;
		&[data-hard='false'] {
			grid-template-columns: repeat(3, minmax(50px, 1fr));
		}
	}

	.guess-row-cell {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 8px 0;
		height: 100%;
		border-radius: 10px;
		overflow-x: auto;
		text-align: center;
	}

	.guess-row-cell.name {
		grid-column-end: span 1;
	}

	.guess-row-cell.lines {
		gap: 5px;
		grid-column-end: span 2;
		cursor: help;
		flex-wrap: wrap;
		overflow-x: auto;
	}

	.guess-row-cell.distance {
		gap: 5px;
	}

	.guess-row-cell[data-correct='correct'] {
		background-color: #d4edda;
	}

	.guess-row-cell[data-correct='incorrect'] {
		background-color: #f8d7da;
	}

	.guess-row-cell[data-correct='partial'] {
		background-color: #ffcc8d;
	}

	.guess-row-cell[data-correct='neutral'] {
		border-radius: 0;
		background: white;
		border: 8px solid var(--primary-color);
		border-radius: 10em;
		font-size: 16pt;
		font-weight: bold;
		overflow: hidden;
	}

	.distance[data-displayed='false'] {
		display: none;
	}

	@media screen and (max-width: 850px) {
		.guess-row-cell {
			font-size: 9pt;
			padding: 5px;
			border-radius: 0;
			text-align: center;
		}

		.guess-row-cell[data-correct='neutral'] {
			font-size: 10pt;
			justify-content: center;
			border-radius: 0;
			border: none;
		}

		.guess-row {
			gap: 0;
			width: 95%;
			box-sizing: border-box;
			margin: 10px auto;
			border-radius: 10em;
			overflow: hidden;
			border: 8px solid var(--primary-color);
		}

		.guess-row-cell.lines {
			flex-wrap: wrap;
			gap: 1px;
		}

		.guess-row-cell.distance {
			gap: 1px;
		}

		.guess-row-cell img {
			width: 16px;
		}
	}
</style>
