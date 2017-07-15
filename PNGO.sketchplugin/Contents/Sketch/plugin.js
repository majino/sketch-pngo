function onExportSlices(context){

  // Get the path to the script
  var scriptPath = context.scriptPath
  var pluginRoot = [scriptPath stringByDeletingLastPathComponent]
  var escapedPath = pluginRoot.replace(/(\s)/, "\\ ")

  var exports = context.actionContext.exports,
      shouldCompressPNG = false,
      pathsToCompress = []

  // We'll take a look at the Array that contains all the exported assets…
  for (var i=0; i < exports.count(); i++) {
    var currentExport = exports.objectAtIndex(i)

    // When we find an asset in PNG format, we add it to the list
    if (currentExport.request.format() == 'png') {
      shouldCompressPNG = true
      var currentPath = String(currentExport.path)
      pathsToCompress.push(currentPath)
    }
  }

  if (shouldCompressPNG) {

    // Let's remove duplicates so that we only compress each asset only once
    var paths = uniqueArray(pathsToCompress),
        success = true

    // Now we run through each one...
    for (var p=0; p < paths.length; p++) {
      var path = paths[p]
      log('Compressing ' + paths.length + ' PNG file(s)')
      if(optimizeFolderWithPNGO(paths[p], escapedPath)) {
        log('Compression success ✅')
      } else {
        log('Compression error ❌')
        success = false
      }
    }
    playSystemSound(success ? "Glass" : "Basso")
  }
}

function optimizeFolderWithPNGO(filePath, scriptPath) {
  var args = [
    "-l",
    "-c",

    // Run the compression script, you can tweak the compression settings in the
    // [compression.sh] script file
    "cd " + scriptPath + "/ && ./compression.sh " + filePath
  ]
  return runCommand("/bin/bash", args)
}

// Utility function to play a given system sound.
function playSystemSound(sound) {
  
  // The command line tool `afplay` does what we need - we just have to call it
  // with the full path of a system sound.
  runCommand("/usr/bin/afplay", ["/System/Library/Sounds/" + sound + ".aiff"])
}

// Utility function to remove duplicates on an Array.
function uniqueArray(arrArg) {
  return arrArg.filter(function(elem, pos,arr) {
    return arr.indexOf(elem) == pos;
  });
};

// Utility function to run a command line command with a set of arguments.
function runCommand(command, args) {
  var task = NSTask.alloc().init();
  task.launchPath = command;
  task.arguments = args;
  task.launch();
  task.waitUntilExit();
  return (task.terminationStatus() == 0)
}
