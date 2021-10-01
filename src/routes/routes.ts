import VerificationController from "../Http/Controllers/VerificationController";
import auth from "../Http/Middleware/Auth";

const routes = (fastify: any, options: object, done: any) => {

    fastify.post('/verify', {
        preValidation: auth,
        schema: {
            body: {
                type: 'object',
                required: ['shop', 'accessToken', 'appBlockTemplates'],
                properties: {
                    shop: {type: 'string'},
                    accessToken: {type: 'string'},
                    appBlockTemplates: {type: 'string'}
                }
            }
        },
        handler: VerificationController.verification
    });

    done();

};

export default routes;
