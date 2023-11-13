const Imap = require('imap');

// Configurações do servidor IMAP
const imapConfig = {
    user: 'automation.webris@gmail.com',
    password: 'nmvfdaokhaiqcxug',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }, // Ignore verificações de certificado (não recomendado em produção)
};

// Pasta de destino para mover os e-mails
const pastaDestino = 'MinhaPasta';

// Crie uma instância do cliente IMAP
const imap = new Imap(imapConfig);

function moverEmails() {
    imap.once('ready', function () {
        imap.openBox('INBOX', false, function (err, box) {
            if (err) throw err;

            // Busque todos os e-mails na caixa de entrada
            imap.search(['ALL'], function (err, results) {
                if (err) throw err;

                // Mova cada e-mail para a pasta de destino
                results.forEach(function (emailId) {
                    imap.move(emailId, pastaDestino, function (err) {
                        if (err) throw err;
                        console.log(`E-mail movido para ${pastaDestino}`);
                    });
                });

                imap.end(); // Encerra a conexão após a conclusão
            });
        });
    });

    imap.once('error', function (err) {
        console.error('Erro na conexão:', err);
    });

    imap.connect();
}

// Iniciar o processo de mover e-mails
moverEmails();
