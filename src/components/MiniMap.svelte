<script lang="ts">
	import { onMount } from 'svelte';
	import SVGMap from '../assets/map.svelte';
	let svg: SVGElement;
	const { stop }: { stop: string | null } = $props();

	let currentFocus: HTMLElement;

	onMount(() => {
		svg = window.document.querySelector('svg')!;
	});

	$effect(() => {
		if (!stop) return;
		if (currentFocus) currentFocus.classList.remove('focused'); // reset previous focus
		const num = stop.slice(1);
		currentFocus = svg.querySelector(`#M${num}`)! as HTMLElement;
		currentFocus.classList.add('focused');
		// 150 as half 300px being the width of the svg,
		// 2 to account for the scale(2) applied to the map.
		const OFFSET = 150 / 2;
		const x = parseInt(currentFocus.getAttribute('cx')!) - OFFSET;
		const y = parseInt(currentFocus.getAttribute('cy')!) - OFFSET;
		svg.setAttribute('viewBox', `${x} ${y} 300 300`);
		console.log(x, y);
	});
</script>

<div class="minimap">
	<SVGMap></SVGMap>
</div>

<style>
	.minimap {
		width: 300px;
		max-width: 95%;
		background: #eee;
		height: 300px;
		overflow: hidden;
		margin: 10px auto;
		border-radius: 10px;
	}
</style>
