import { writable } from "svelte/store";

export const notes = writable([]);
export const activeNoteId = writable(null)
