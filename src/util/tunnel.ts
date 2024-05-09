import { createTunnel } from 'tunnel-ssh';

const port = 5432;

const tunnelOptions = {
    autoClose: true
};
const serverOptions = {
    port: port
};
const sshOptions = {
    host: 'mini.hellonoa.dev',
    port: 22,
    username: 'hellonoa',
    password: '040502'
};
const forwardOptions = {
    srcAddr: 'localhost',
    srcPort: port,
    dstAddr: 'localhost',
    dstPort: port
};


export const sshTunnel = async () => {
    console.log('sshTunnel')
    let [server, conn] = await createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions);
    server.on('connection', (connection) => {
        console.log('new connection');
    });
}
