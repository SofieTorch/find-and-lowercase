const core = require('@actions/core');
const fs = require('fs');
const path = require("path");


function walk_recursive(dir, exclude, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) throw err;
    files.forEach(function (file) {
      var filepath = path.join(dir, file);
      if (!exclude.test(filepath)) {
        fs.stat(filepath, function (err, stats) {
          if (stats.isDirectory()) {
            walk_recursive(filepath, exclude, callback);
          } else if (stats.isFile()) {
            callback(filepath, stats);
          }
        });
      }
    });
  });
}

try {
  const regex = new RegExp(core.getInput('regex'), core.getInput('flags'));
  const include = new RegExp(core.getInput('include'));
  const exclude = new RegExp(core.getInput('exclude'));
  const encoding = core.getInput('encoding');
  const start_path = core.getInput('path');

  walk_recursive(start_path, exclude, (file) => {
    if (include.test(file)) {
      fs.readFile(file, encoding, function (err, data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(regex, function (x) {
          return x.toLowerCase();
        });
        if (data != result) {
          console.log('Modifying ', file);
          fs.writeFile(file, result, encoding, function (err) {
            if (err) return core.setFailed(err);
          });
        }
      });
    }
  })
} catch (error) {
  core.setFailed(error.message);
}