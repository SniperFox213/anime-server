const readline = require('readline');
const os = require('os');
const { ScriptServer  } = require('@scriptserver/core');

// Readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function start() {
    rl.question('Действительно хочешь запустить сервер? (да/нет): ', (answer) => {
        if (answer.toLowerCase() == "да") {
            console.log('Проверяем...');
            const freeRam = os.freemem() / (1024 * 1024)

            console.log('Доступное кол-во оперативной памяти: ', freeRam);
            if (freeRam >= 4000) {
                console.log('Запускаем сервер...');

                rl.on('line', (line) => {
                    if (line.toLowerCase() == "stop") {
                        server.stop();
                    };
                });

                const server = new ScriptServer({
                    javaServer: {
                        path: '.',
                        jar: 'mohist-1.16.5-1020-server.jar',
                        args: ['-Xms1G', '-Xmx4G'],
                    },
                    rconConnection: {
                        port: 25575,
                        password: 'password',
                    },
                });

                // On stop
                server.javaServer.on('stop', () => {
                    start();
                });

                // Starting server
                server.start();
            } else {
                console.log('Невозможно запустить сервер - недостаточное количество памяти. Обратитесь к Администратору.');
                process.exit(1);
            };
        } else {
            process.exit(1);
        };
    });
};

start();