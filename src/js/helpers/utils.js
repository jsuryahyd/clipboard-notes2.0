export function onSave(event, runFunc) {
  var isCtrlKeyDown =
      navigator.platform.indexOf("Mac") > -1 ? event.metaKey : event.ctrlKey,
    isSDown =
      (event.key && event.key === "s") || (event.keyCode || event.which) === 83; // falls back to keycode if no event.key

  if (isCtrlKeyDown && isSDown) {
    // prevent default event on newer browsers
    if (event.preventDefault) {
      event.preventDefault();
    }
    runFunc();
    // prevent default event on older browsers
    return false;
  }
}

export function onNewItem(event, runFunc) {
  // var isCtrlKeyDown =
  //     navigator.platform.indexOf("Mac") > -1 ? event.metaKey : event.ctrlKey,
  var isShiftKeyDown = event.shiftKey,
    isNDown =
      (event.key && event.key === "n") || (event.keyCode || event.which) === 78; // falls back to keycode if no event.key
  if (isShiftKeyDown && isNDown) {
    // prevent default event on newer browsers
    if (event.preventDefault) {
      event.preventDefault();
    }
    runFunc();
    // prevent default event on older browsers
    return false;
  }
}

export function updateNotes(chrome, activeNotes) {
  chrome.storage.sync.get("notes", data => {
    console.log("data", data);
    const notes = data.notes;
    const isUpdate = notes.findIndex(n => n.noteId == activeNotes.noteId) >= 0;
    let newNotes;
    if (isUpdate) {
      newNotes = notes.map(n => {
        if (n.noteId == activeNotes.noteId) {
          return activeNotes;
        } else {
          return n;
        }
      });
    } else {
      newNotes = [...notes, activeNotes];
    }
    chrome.storage.sync.set(
      {
        notes: newNotes
      },
      err => {
        if (err) console.log("couldnot update ntoes on popup close");
      }
    );
  });
}

// https://github.com/quilljs/quill/issues/163
export function isQuillEmpty(quill) {
  return (
    quill.getText().trim().length === 0 &&
    quill.container.firstChild.innerHTML.includes("img") === false
  );
};


