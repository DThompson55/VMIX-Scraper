const electron = require('electron')
const ipc = electron.ipcRenderer;


window.addEventListener('DOMContentLoaded', () => {
  var buttonMask = 0;

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }

  ipc.on('VMIX_STATUS', (event, message) => {
   document.querySelector('#vmix-status').innerHTML = message;
  })

  ipc.on('validation', (event, message) => {
   document.querySelector('#validation').innerHTML = message;
  })

   const reply = ipc.sendSync('initScenes')
   setDescriptions(reply)
   document.querySelector('#vmix-status').innerHTML = "waiting for connection...";
 

   ipc.on('FILE_OPEN', (event, message) => {
//      document.querySelector('#scene-file').innerHTML = message;
      document.querySelector('#no-file-loaded').style.display = "none";
//      setDescriptions(reply)

    })

  function setDescriptions(reply){
  }


})

