<script>
  //@ts-check
  import { onMount, tick, onDestroy } from "svelte";
  import Quill from "quill";
  import hljs from "highlight.js";
  import { onSave, updateNotes } from "../../js/helpers/utils.js";
  import { formatDate } from "../../js/helpers.js";
  import { notes, activeNoteId } from "./notes.store.js";
  console.log("notes", notes);
  let editorList = {},
    notesUnSub;

  function setActiveNoteId(id) {
    activeNoteId.update(w => id);
  }

  function createEditors() {
    notesUnSub = notes.subscribe(async notesList => {
      // console.log("notesList", notesList);

      //since setting notes=data.notes doesnot *immediately* update the dom, and we need dom elements to be present for quill to initialize...
      await tick();

      for (let note of notesList) {
        console.log(document.getElementById("#note_" + note.noteId));
        let quill = new Quill("#note_" + note.noteId, {
          readOnly: true,
          theme: "snow",
          modules: { toolbar: false }
        });
        quill.setContents(note.notes);
        editorList[note.noteId] = quill;
      }
    });
  }

  onMount(() => {
    // chrome.storage.sync.get(["notes"], async data => {
    //   console.log("noteslist", data.notes);
    //   notes.update(n => data.notes);

    //   await tick();
    createEditors();
    // });
  });
  onDestroy(() => {
    notesUnSub();
  });
  function enableEdit(noteId) {
    const editor = editorList[noteId];
    editor.enable();
    setActiveNoteId(noteId);
  }

  function disableEdit(noteId) {
    const editor = editorList[noteId];
    editor.disable();
  }

  function kbdShortCuts(e, noteId) {
    onSave(e, () => {
      updateNotes(chrome, {
        noteId,
        notes: editorList[noteId].getContents().ops
      });
      console.log(editorList[noteId].getContents().ops);
      disableEdit(noteId);
    });
  }

  console.log($notes);
</script>

<style>
  .notes-list {
    list-style-type: none;
    padding: 10px;
  }

  .notes-list > li {
    border-radius: 4px;
    border: 1px solid #ccc;
    margin: 10px 0 10px 0;
  }

  .delete-icon::before {
    content: "\e901";
     font-family: iconFont;
    font-size: 1.5rem;
    color: var(--text-color, white);
  }

  /*
- this wont apply since the classes are post-fixed with random strings
*/
  .notes-list > li > .ql-container,
  .notes-list > li > .ql-container.ql-snow {
    border: none !important;
  }
</style>

<ul class="notes-list">
  {#each $notes as note}
    <li>
      <header style="padding:10px;border-bottom:1px solid #ccc;display:flex;justify-content:space-between">
        <p style="font-size:1rem;margin-bottom:0;margin-top:0">
          {formatDate(new Date(note.noteId))}
        </p>
        <span class="delete-icon" />
      </header>
      <main
        id="note_{note.noteId}"
        on:click={() => enableEdit(note.noteId)}
        on:keydown={e => kbdShortCuts(e, note.noteId)} />
    </li>
  {/each}
</ul>
