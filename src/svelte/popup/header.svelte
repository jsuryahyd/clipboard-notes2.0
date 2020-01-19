<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  function addNewNote() {
    dispatch("press",{});
  }
  export let appTitle;
</script>

<style>
  header {
    height: 40px;
    width: 100%;
    position: fixed;
    top: 0;
    background: white;
    display: flex;
    align-items: center;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .app-title {
    color: var(--theme-color, dimgray);
    font-size: 1.33rem;
  }
  .settings-icon::before {
    content: "\e994";
    font-family: iconFont;
    font-size: 1.5rem;
    color: var(--theme-color, dimgray);
  }
  .add-icon::before {
    content: "\e902";
    font-family: iconFont;
    font-size: 1.7rem;
    color: var(--theme-color, dimgray);
  }
</style>

<header style="padding:0.5rem 1rem">
  <h2 class="app-title">{appTitle}</h2>
  <button
    on:click={addNewNote}
    class="btn--no_style"
    id="add_notes_btn"
    style="margin-left: auto;margin-right:10px;display: flex;align-items:
    center;cursor: pointer;">
    <span class="add-icon" />
  </button>
  <button
    class="btn--no_style"
    id="options_btn"
    on:click={() => alert('wow!')}
    style="display: flex;align-items: center;cursor: pointer;">

    <span class="settings-icon" />
  </button>
</header>
