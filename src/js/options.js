import "../css/options.css";
import App from '../svelte/options.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Surya'
	}
});

window.app = app;

export default app;