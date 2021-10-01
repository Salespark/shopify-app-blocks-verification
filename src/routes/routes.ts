import VerificationController from "../Http/Controllers/VerificationController";
import auth from "../Http/Middleware/Auth";

const routes = (fastify: any, options: object, done: any) => {

    // appBlockTemplates: {
    //     type: 'array',
    //     enum: ['product', 'collection', 'index']
    // }
    fastify.post('/verify', {
        preValidation: auth,
        schema: {
            body: {
                type: 'object',
                required: ['shop', 'accessToken', 'appBlockTemplates'],
                properties: {
                    shop: {type: 'string'},
                    accessToken: {type: 'string'},

                }
            }
        },
        handler: VerificationController.verification
    });

    done();

};

export default routes;
