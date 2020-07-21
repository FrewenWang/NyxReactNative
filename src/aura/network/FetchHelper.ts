import Options, {Method} from './lib/Options';
import HttpEngineUtils from './utils/FetchUtils';
import Logger from '../utils/Logger';
import {ErrorCode} from './response/ErrorCode';
import {HttpResponse} from './response/HttpResponse';
import FetchUtils from './utils/FetchUtils';

const TAG = 'FetchHelper';
export default class FetchHelper {
    /**
     * Fetch网络请求的Request
     * @param url
     * @param options
     */
    public static async request(url: string, options: Options): Promise<any> {
        if (options.debug) {
            Logger.log(TAG, `request:url: ${url}, options: ${JSON.stringify(options)}`);
        }
        let response: any;
        try {
            if (options.method === Method.GET) {
                response = await this.requestGet(url, options);
            } else if (options.method === Method.POST) {
                response = await this.requestPost(url, options);
            } else {
                throw 'request method should not be null';
            }
        } catch (e) {
            Logger.log(TAG, 'Fetch Request error:', e);
            response = {
                errCode: ErrorCode.FETCH_ERROR,
                message: e.toString(),
                data: '',
            };
            return response;
        }
        if (options.debug) {
            Logger.log(TAG, `response: ${JSON.stringify(response)}`);
        } else {
            Logger.log(TAG, `response: ${response.code},msg: ${response.msg},url:${response.url}`);
        }
        return response;
    }

    /**
     * Get请求处理
     * @param url
     * @param options
     */
    private static async requestGet(url: string, options: Options): Promise<any> {
        url = HttpEngineUtils.handleUrl(url, options.params);
        return await FetchUtils.timeoutFetch(
            fetch(url, {
                method: options.method,
                headers: options.headers,
            })
                .then((response: Response): any => {
                    if (response && response.ok) {
                        let result = response.json();
                        HttpEngineUtils.releaseResponse(response);
                        return result;
                    } else if (response) {
                        let errorResp: HttpResponse = {
                            code: response.status,
                            message: response.statusText,
                            data: '',
                            debug: options.debug,
                            url: response.url,
                        };
                        HttpEngineUtils.releaseResponse(response);
                        return Promise.reject(errorResp);
                    }
                })
                .then((data: any): any => {
                    return data;
                }),
        );
    }

    private static async requestPost(url: string, options: Options): Promise<any> {
        let formData = new FormData();
        let param = options.params ? options.params : {};
        Object.keys(param).forEach((key) => {
            formData.append(key, param[key]);
        });
        return await FetchUtils.timeoutFetch(
            fetch(url, {
                method: options.method,
                headers: options.headers,
                body: formData,
            })
                .then((response: Response): any => {
                    if (response && response.ok) {
                        let result = response.json();
                        HttpEngineUtils.releaseResponse(response);
                        return result;
                    } else if (response) {
                        let httpResp: HttpResponse = {
                            code: response.status,
                            message: response.statusText,
                            data: '',
                            debug: options.debug,
                            url: response.url,
                        };
                        HttpEngineUtils.releaseResponse(response);
                        return Promise.reject(JSON.stringify(httpResp));
                    }
                })
                .then((data: any): any => {
                    return data;
                }),
        );
    }
}
