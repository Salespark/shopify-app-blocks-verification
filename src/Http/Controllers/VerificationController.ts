import ShopifyService from '../../services/ShopifyService';
import { errorResponse, successResponse } from '../../utils/responses';
import statusCodes from '../../utils/status_codes';

class VerificationController {
  public static verification = async (request: any, reply: any) => {
    try {
      let { appBlockTemplates } = request.body;
      appBlockTemplates = JSON.parse(appBlockTemplates);
      request.body = { ...request.body, appBlockTemplates: appBlockTemplates };
      const response = await ShopifyService.verifyAppBlocks(request);
      const data = {
        verify: response,
      };
      successResponse(reply, null, data);
    } catch (exception: any) {
      errorResponse(reply, exception.message, statusCodes.INTERNAL_SERVER_ERROR);
    }
  };
}

export default VerificationController;
