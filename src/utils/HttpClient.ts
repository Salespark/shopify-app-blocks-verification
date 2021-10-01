import axios from "axios";

class HttpClient {

    public static shopifyPostRequest(url: string, data: Object, accessToken: string) {
        return axios.post(url, data, {
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json'
            }
        });
    }

    public static shopifyGetRequest(url: string, accessToken: string) {
        return axios.get(url, {
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json'
            }
        });
    }
}

export default HttpClient;

