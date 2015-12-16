module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  var config = require('./config.json');

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      deployTo: config.deploy.path,
      repositoryUrl: 'https://github.com/snollygolly/koa-starter.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 2,
      key: '~/.ssh/id_rsa',
      shallowClone: true
    },
    production: {
      servers: config.deploy.username + '@' + config.deploy.hostname
    }
  });

  // this task runs an NPM install remotely to install dependencies
  shipit.blTask('install', function () {
    return shipit.remote("PATH='$PATH:/usr/local/bin' && cd " + config.deploy.path + "/current && npm install &> /dev/null");
  });

  // this task starts the server in a screen with a name set in the config
  shipit.blTask('start_screen', function () {
    return shipit.remote("PATH='$PATH:/usr/local/bin' && cd " + config.deploy.path + "/current && screen -S " + config.deploy.screen + " -d -m npm start");
  });

  // this task starts the server directly in the shipit output.  use this instead of start_screen if you're having problems
  shipit.blTask('start_session', function () {
    return shipit.remote("PATH='$PATH:/usr/local/bin' && cd " + config.deploy.path + "/current && npm start");
  });

  // this task starts the server directly in the shipit output.  use this instead of start_screen if you're having problems
  shipit.blTask('wait_port', function () {
    return shipit.remote("while nc -z localhost 5000; do sleep 1; done");
  });

  // this task copies the config.json from your local folder to the current folder
  // TODO: improve this so it installs config from a remote location?
  shipit.blTask('install_config', function () {
    shipit.remoteCopy('config.json', config.deploy.path + "/current");
  });

  // this task kills any screen with the name set in the config if it's running.  phrased as an if to prevent non-0 exit codes
  shipit.blTask('kill_screen', function () {
    return shipit.remote("if screen -list | grep -q '" + config.deploy.screen + "'; then screen -S " + config.deploy.screen + " -X quit; fi;");
  });

  shipit.on('deployed', function () {
    // this series of tasks will result in a good deploy assuming everything is working
    shipit.start( 'kill_screen', 'install', 'install_config', 'wait_port', 'start_screen');
    // if you're having problems with the deploy being successful, but not actually starting the server, try this:
    //shipit.start('kill_screen', 'install', 'install_config', 'wait_port', 'start_session');
  });
};
