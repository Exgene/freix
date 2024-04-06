<script lang="ts">
	import * as Maps from '@googlemaps/js-api-loader';
	import { type LoaderOptions } from '@googlemaps/js-api-loader';
	import { onMount } from 'svelte';
	import mapStyles from './map-styles';
	export let apiKey: string;
	export let loaderOptions: Omit<LoaderOptions, 'apiKey'> | null = null;
	export let mapOptions: google.maps.MapOptions | null = null;
	const { Loader } = Maps;

	let map: google.maps.Map;
	let container: HTMLElement;

	async function testGemini() {
		const response = await fetch('/api/gemini', {
			method: 'POST',
			body: JSON.stringify({
				prompt: '{"source":"India","destination":"US","HSCode":"7326"}'
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const total = await response.json();
		console.log(total);
	}

	onMount(() => {
		// testGemini();
		const loader = new Loader({
			version: 'quarterly',
			...loaderOptions,
			apiKey
		});

		loader.importLibrary('maps').then(() => {
			map = new google.maps.Map(container, {
				center: { lat: 23.37, lng: 82.5 },
				zoom: 0,
				minZoom: 2,
				gestureHandling: 'greedy',
				streetViewControl: false,
				styles: mapStyles,
				...mapOptions
			});
		});
	});
</script>

<div bind:this={container} id="map" {...$$restProps} />