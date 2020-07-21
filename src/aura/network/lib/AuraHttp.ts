import Options, {Method} from './Options';
import Logger from '../../utils/Logger';
import {FetchMainRequest} from '../interceptors/FetchMainRequest';
import RegExgUtils from '../../utils/RegExgUtils';
import {RequestInterceptor} from '../interceptors/RequestInterceptor';
import {ResponseInterceptor} from '../interceptors/ResponseInterceptor';
import {RequestInterceptorProcessor} from '../interceptors/processer/RequestInterceptorProcessor';

const TAG = 'AuraHttp';
export default class AuraHttp {
    private requestInterceptors: Set<RequestInterceptor>;
    private responseInterceptors: Set<ResponseInterceptor>;
    /**
     * 网络请求的配置
     */
    private options: Options = {
        debug: false,
        method: Method.GET,
        connectTimeout: 10 * 1000,
        readTimeout: 10 * 1000,
        writeTimeout: 10 * 1000,
        headers: {
            Accept: 'application/json',
        },
    };

    public constructor(options: Options) {
        this.options = Object.assign({}, this.options, options);
        Logger.log(TAG, `constructor options = ${JSON.stringify(this.options)}`);
        this.requestInterceptors = new Set<RequestInterceptor>();
        this.responseInterceptors = new Set<ResponseInterceptor>();
    }

    /**
     * get  请求
     * @param url
     */
    public get(url: string, options?: Options): Promise<any> {
        if (options) {
            options.method = Method.GET;
        } else {
            options = {
                method: Method.GET,
            };
        }
        return this.request(url, options);
    }

    /**
     * post 请求
     * @param url
     */
    public post(url: string, options?: Options): Promise<any> {
        if (options) {
            options.method = Method.POST;
        } else {
            options = {
                method: Method.POST,
            };
        }
        return this.request(url, options);
    }

    /**
     * 进行网络请求的
     * @param url
     * @param config
     */
    public async request(url: string, options: Options): Promise<any> {
        options = Object.assign({}, this.options, options);

        try {
            if (!RegExgUtils.validURL(url) && (this.options.baseUrl || options.baseUrl)) {
                url = options.baseUrl ? options.baseUrl + url : this.options.baseUrl + url;
            }
            if (options.debug) {
                Logger.log(TAG, `request: url: ${url}, options: ${JSON.stringify(options)}`);
            }

            let requestBeginTime = Date.now();
            // http的请求的主要逻辑
            let response = await new FetchMainRequest().process(url, options);

            let requestEndTime = Date.now();

            if (options.debug) {
                Logger.log(
                    TAG,
                    `httpRequest response: url: ${url}, response: ${unescape(JSON.stringify(response))}, const:${
                        requestEndTime - requestBeginTime
                    }`,
                );
            } else {
                // 返回结果日志打印
                console.log(
                    TAG,
                    `httpRequest success: ${response.ok},status = ${response.status},url = ${unescape(
                        response.url,
                    )}, const:${requestEndTime - requestBeginTime}`,
                );
            }
        } catch (e) {
            Logger.log(TAG, `httpRequest failed url = ${url} , error : ${e}`);
            let response = {
                code: -1,
                msg: `error:${e}`,
            };
            return Promise.reject(JSON.stringify(response));
        }
    }

    public addRequestInterceptor(interceptor: RequestInterceptor): void {
        this.requestInterceptors.add(interceptor);
    }

    public addResponseInterceptor(interceptor: ResponseInterceptor): void {
        this.responseInterceptors.add(interceptor);
    }

    /**
     * 获取HttpEngine的默认配置
     */
    public getDefaultOptions(): Options {
        return this.options;
    }

    /**
     * 更新HttpEngine的默认配置
     */
    public updateDefaultOptions(options: Options): void {
        options = Object.assign({}, this.options, options);
        this.options = options;
    }
}
