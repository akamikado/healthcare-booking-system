import mysql, { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
  host: process.env.DB_HOST as string,
  port: process.env.DB_PORT as unknown as number,
}

const connect = mysql.createConnection(access);

export default connect;
