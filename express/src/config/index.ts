import dotenv  from "dotenv";
import path from "path";
dotenv.config({
        path: path.resolve(process.cwd(), ".env")
});

const config ={
    connection_string: process.env.CONNECTIONSTRING as string,
    port: process.env.PORT,
};
export default config;