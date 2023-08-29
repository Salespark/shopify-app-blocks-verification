import { FastifyInstance } from 'fastify';

class ContextManager {
  protected static fastifyInstance: any;

  public static setFastifyInstance(instance: FastifyInstance) {
    ContextManager.fastifyInstance = instance;
  }

  public static getFastifyInstance() {
    return ContextManager.fastifyInstance;
  }
}

export default ContextManager;
