const {spawn} = require('child_process')

const ls = spawn('ls', ['/'], {
    shell: true
});

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});
// ls.on('error', (err) => {
//     console.log(err)
//     console.error('Failed to start subprocess.');
// });
ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
