<script>
  import { onMount } from "svelte";
  import Header from "./popup/header.svelte";
  import NewNote from "./popup/newNote.svelte";
  import NotesList from "./popup/notes.svelte";
  import { onNewItem, isQuillEmpty } from "../js/helpers/utils.js";
  import { notes, activeNoteId } from "./popup/notes.store.js";
  export let appTitle;
  let newNote = false;
  /**
   * @description adds new note if there is no current editor or the current activenote is not empty
   */
  function addNewNote() {
    if (
      !$activeNoteId ||
      ($activeNoteId &&
        !isQuillEmpty($notes.find(n => n, noteId == $activeNoteId).notes))
    ) {
      newNote = true;
    }
  }

  function handleKbdShortcuts(e) {
    // e.preventDefault()//wont work for ctrl+n
    onNewItem(e, () => {
      // e.preventDefault()
      addNewNote();
    });
  }

  onMount(() => {
    chrome.storage.sync.get(["notes"], async data => {
      console.log("noteslist", data.notes);
      notes.update(n => data.notes);
    });
  });
</script>

<style>
  main {
    padding-top: 40px;
  }
</style>

<svelte:body on:keydown={handleKbdShortcuts} />
<main>
  <Header {appTitle} on:press={addNewNote} />
  {#if newNote}
    <NewNote noteId={new Date().getTime()} />
  {/if}
  <NotesList />
</main>
