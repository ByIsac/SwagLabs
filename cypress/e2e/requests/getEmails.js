const Imap = require('imap');

const imap = new Imap({
    user: 'automation.webris@gmail.com',
    password: 'nmvfdaokhaiqcxug',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false
    }
});

function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

function fetchEmailBody(callback) {
    imap.once('ready', function () {
        openInbox(function (err, box) {
            if (err) throw err;

            const fetch = imap.seq.fetch('*', {
                bodies: 'TEXT',
                struct: true
            });

            fetch.on('message', function (msg, seqno) {

                let messageBody = '';

                msg.on('body', function (stream) {
                    stream.on('data', function (chunk) {
                        messageBody += chunk.toString('utf8');
                    });

                    stream.once('end', function () {
                        callback(messageBody);
                    });
                });
            });

            fetch.once('end', function () {
                imap.end();
            });
        });
    });

    imap.once('error', function (err) {
        console.error(err);
    });

    imap.once('end', function () {
    });

    imap.connect();
}

fetchEmailBody(function (emailBody) {
    console.log(emailBody.substring(0, 25));
});