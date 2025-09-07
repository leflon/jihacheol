<script lang="ts">
	import { onMount } from 'svelte';
	import SVGMap from '../assets/map.svelte';
	import { storage } from '$lib/storage';

	const { stop }: { stop: string | null } = $props();

	let svg: SVGElement;
	let currentFocus: HTMLElement;

	onMount(() => {
		svg = window.document.querySelector('svg')!;
	});

	$effect(() => {
		if (!stop) return;
		if (currentFocus) currentFocus.classList.remove('focused'); // reset previous focus
		const num = stop.slice(1);
		currentFocus = svg.querySelector(`#M${num}`)! as HTMLElement;

		/* Ensure the circle/rectangle is on top of all others,
		which ensures a better animation (outline doesn't appear under other shapes) */
		const parent = currentFocus.parentElement!;
		currentFocus.remove();
		parent.insertAdjacentElement('beforeend', currentFocus);

		currentFocus.classList.add('focused');
		// 150 as half 300px being the width of the svg,
		// 2 to account for the scale(2) applied to the map.
		const OFFSET = 150 / 2;
		const x = parseInt(currentFocus.getAttribute('cx')!) - OFFSET;
		const y = parseInt(currentFocus.getAttribute('cy')!) - OFFSET;
		svg.setAttribute('viewBox', `${x} ${y} 300 300`);
	});
</script>

<div class="minimap" class:hard={$storage.hardMode}>
	<SVGMap></SVGMap>
</div>

<style scoped>
	.minimap {
		width: 300px;
		max-width: 95%;
		background: #eee;
		height: 300px;
		overflow: hidden;
		margin: 10px auto;
		border-radius: 10px;
	}
	/* Additional styles in main.css */
</style>
