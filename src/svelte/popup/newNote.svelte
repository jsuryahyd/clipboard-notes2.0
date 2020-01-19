<script>
  import Quill from "quill";
  import { onMount } from "svelte";
  import { onSave, updateNotes, isQuillEmpty } from "../../js/helpers/utils.js";
  import hljs from "highlight.js";
  export let noteId;
  var options = {
    // debug: "info",
    modules: {
      // toolbar: "#toolbar",
      toolbar: false,
      // toolbar: [['code-block']] ,
      // syntax:true,
      keyboard: {
        bindings: {
          codeBlock: {
            key: "c",
            // altKey:true,
            // collapsed: true,
            shiftKey: true,
            ctrlKey: true,
            handler: function(range, context) {
              console.log(this.quill);
              if (context.format["code-block"]) {
                this.quill.format("code-block", false);
              } else {
                this.quill.format("code-block", true);
              }
            }
          }
        }
      }
    },
    placeholder: "Type here or Ctrl+V",
    readOnly: false,
    theme: "snow" //"bubble"
  };

  let quill;
  onMount(() => {
    // imp: initialize inside onMount
    quill = new Quill("#editor", options);
    quill.setSelection(0, quill.getLength());
    var background = chrome.extension.getBackgroundPage();

    //example to send message to background.js
    // chrome.runtime.sendMessage(
    //   { whatever: "whatever" },
    //   response => {
    //     console.log("this can be seen ");
    //   }
    // );

    window.addEventListener(
      "unload",
      function(event) {
        // background.console.log("event ", event.type, background);
        !isQuillEmpty(quill) &&
          background.saveNotes({
            activeNotes: { noteId, notes: quill.getContents().ops }
          });

        //doesnot run, even through it runs outside eventlistener
        // chrome.runtime.sendMessage(
        //   { saveNote: quill.getContents().ops },
        //   response => {
        //     console.log("this cant be seen becuase the window is unloaded");
        //   }
        // );
      },
      true
    );
  });

  function handleKbdShortcuts(e) {
    onSave(e, () => {
      !isQuillEmpty(quill) &&
        updateNotes(chrome, {
          noteId: noteId || new Date().getTime(),
          notes: quill.getContents().ops
        });
      quill.setSelection();
    });
  }

  // https://stackoverflow.com/a/49255721/7314900
</script>

<style>
  .newNote {
    color: "white";
  }
  #editor {
    text-align: center;
    padding: 30px 0px;
    font-size: 1.2rem;
    border: none;
    margin-bottom: 20px;
  }
  #toolbar {
    display: none;
  }
</style>

<div class="newNote">
  <div id="toolbar" />
  <div id="editor" on:keydown={handleKbdShortcuts}>
    <p>Hello World!</p>
    <p>
      Ctrl+B for
      <strong>bold</strong>
      text
    </p>
    <p>
      Ctrl+Shift+C for
      <code>Code Block</code>
      text
    </p>

    <p>
      Ctrl+U for
      <span style="text-decoration:underline">Underline</span>
      text
    </p>
    <p>
      Ctrl+I for
      <i>Italic</i>
      text
    </p>
    <br />
  </div>
</div>
