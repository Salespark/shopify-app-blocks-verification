import fastify from 'fastify';
import {FastifyInstance} from "fastify";
import autoLoad from 'fastify-autoload'
import dotenv from 'dotenv'
import cors from 'fastify-cors';
import {join} from 'path'
import ContextManager from "./utils/ContextManager";

const dotenvResult = dotenv.config({
    path: "./environment/.env"
});

if (dotenvResult.error) {
    throw dotenvResult.error
}

const PORT = process.env.PORT || 3000;

const appBlockVerification: FastifyInstance = fastify({logger: true});
ContextManager.setFastifyInstance(appBlockVerification);

appBlockVerification.register(cors, {});
// app routes
appBlockVerification.register(autoLoad, {
    dir: join(__dirname, 'routes')
});

// starting the server
(async () => {
    try {
        await appBlockVerification.listen(PORT);
    } catch (err) {
        appBlockVerification.log.error(err);
        process.exit(1);
    }

})();
