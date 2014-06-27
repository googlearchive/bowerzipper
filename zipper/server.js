var express = require('express');
var child_process = require('child_process');
var archiver = require('archiver');
var bodyParser = require('body-parser');
var temp = require('temp');
var Insight = require('insight');
var PKG = require('./package.json');

temp.track(); // Ensure temp directories are cleaned up.

// Insight metrics tool. Logging to Google Analytics.
var insight = new Insight({
  trackingProvider: 'google',
  trackingCode: 'UA-39334307-7',
  packageName: PKG.name,
  packageVersion: PKG.version
});
insight.optOut = false;

var PORT = 8080;

var app = express();
app.listen(PORT);
app.use(bodyParser());
app.use(function(req, res, next) { // Enable CORS non the endpoints.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// routing and other middleware

function exec_value(error, stdout, stderr) {
  if (stdout) {
    console.log(stdout);
  }
  if (stderr) {
    console.log('stderr: ' + stderr);
  }
  if (error !== null) {
    console.log('exec error: ' + error);
  }
  return stdout;
}

function finisher(res) {
  return function(error, stdout, stderr) {
    res.send(exec_value(error, stdout, stderr));
    res.end();
  }
}

function asyncIterator(array, task, next) {
  var inflight = array.length;
  function gate() {
    if (--inflight === 0) {
      next();
    }
  }
  array.forEach(function(e) {
    task(e, gate);
  });
}

function bowerInstall(pkgs, callback) {
  var componentPath = temp.mkdirSync('bower-install');

  if (!Object.keys(pkgs).length) {
    return;
  }

  var intallList = '';
  for (var name in pkgs) {
    intallList += ' ' + name + '=' + pkgs[name] + '#master';
  }

  var cmd = 'bower --allow-root install' + intallList + ' --force-latest';
  clog('\x1b[37;47m ' + cmd + ' ');
  clog('\x1b[34;47m ' + cmd + ' ');
  clog('\x1b[37;47m ' + cmd + ' ');
  clog('');
  var child = child_process.exec(
    cmd,
    {
      cwd: componentPath
    },
    function(err, stdout, stderr) {
      callback(err, stdout, stderr, componentPath);
    }
  );
}

function archive(res, componentPath, callback) {
  var cmd = 'archive';
  clog('\x1b[37;47m ' + cmd + ' ');
  clog('\x1b[34;47m ' + cmd + ' ');
  clog('\x1b[37;47m ' + cmd + ' ');
  clog('');
  
  var archive = archiver('zip');

  archive.on('end', function () {
     console.log(archive.pointer() + ' total bytes');
     console.log('archiver has been finalized and the output file descriptor has closed.');
     callback(null);
  });

  archive.on('error', function(err){
    callback(err);
  });

  archive.pipe(res);
  archive.bulk([
      { expand: true, cwd: componentPath, src: ['**'], dest: 'components'}
  ]);
  archive.finalize();
}

// GET /archive?name=pkg ==> install component, get zip
// Example: /archive?core-ajax=Polymer/core-ajax
//          /archive?core-ajax=Polymer/core-ajax&core-tooltip=Polymer/core-tooltip
app.get('/archive', function (req, res) {
  var pkgs = {};
  for (var n in req.query) {
    pkgs[n] = req.query[n];
  }

  if (!Object.keys(pkgs).length) {
    res.write(
      'Examples:\n' +
      '/archive?core-ajax=Polymer/core-ajax\n' + 
      '/archive?core-ajax=Polymer/core-ajax&google-sheets=GoogleWebComponents/google-sheets');
    res.end();
    return;
  }

  var source = req.headers.referer || req.host;
  insight.track('archive', source); // record `/archive/referrer` in Analytics.

  bowerInstall(pkgs, function(err, stdout, stderr, componentPath) {
    archive(res, componentPath, function(err) {

      temp.cleanup();

      if (err) {
        res.send(err);
        res.close();
        console.log(err);
      }  
    });
  });
});

// colorizable logging utility
function clog() {
  var args = Array.prototype.slice.call(arguments);
  args.push('\x1b[00m');
  console.log.apply(console, args);
}

// tell user what is happening
clog('\n=========== Bowerzipper ===========\n');
clog('Listening on port: \x1b[34;47m ' + PORT);
clog();
