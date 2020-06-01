import Options, {Method} from "./Options";
import Logger from "../../utils/Logger";
import FetchHelper from "../FetchHelper";

const TAG = "AuraHttp";
export default class AuraHttp {
    /**
     * 网络请求的配置
     */
    private readonly options: Options = {
        method: Method.GET,
        connectTimeout: 10 * 1000,
        readTimeout: 10 * 1000,
        writeTimeout: 10 * 1000,
        headers: {
            Accept: 'application/json'
        }
    };

    public constructor(options?: Options) {
        this.options = Object.assign({}, this.options, options);
        Logger.log(TAG, `constructor options = ${JSON.stringify(this.options)}`);
    }

    /**
     * get请求
     * @param url
     */
    public get(url: string, options?: Options): Promise<any> {
        let getOption = {
            method: Method.GET
        };
        options = Object.assign({}, options, getOption);
        return this.request(url, options);
    }

    /**
     * post请求
     * @param url
     */
    public post(url: string, options?: Options): Promise<any> {
        let postOption = {
            method: Method.POST
        };
        options = Object.assign({}, options, postOption);
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
            if (this.options.baseUrl || options.baseUrl) {
                url = options.baseUrl
                    ? options.baseUrl + url
                    : this.options.baseUrl + url;
            }
            let requestTime = Date.now();
            let response;
            if (options.method === Method.GET) {
                response = await this.requestGet(url, options);
            } else if (options.method === Method.POST) {
                response = await this.requestPost(url, options);
            } else {
                throw 'request method should not be null';
            }

            let costTime = Date.now() - requestTime;
            // 返回结果日志打印
            console.log(TAG, `request success:${response.ok},status:${response.status},cost:${costTime}`);

            if (response && response.ok) {
                let result = response.json();
                return result;
            } else {
                Logger.log(TAG, `request failed url = ${url}`);

            }
        } catch (e) {
            Logger.log(TAG, `request failed url = ${url} , error : ${e}`);
            let response = {
                code: -1,
                msg: `error:${e}`
            };
            return Promise.reject(JSON.stringify(response));
        }
    }

    private requestGet(url: string, options: Options): Promise<any> {
        url = FetchHelper.handleUrl(url, options.params);
        Logger.log(TAG, `url = ${url}, options = ${JSON.stringify(options)}`);
        return FetchHelper.timeoutFetch(
            fetch(url, {
                method: options.method,
                headers: options.headers
            })
        );
    }

    private requestPost(url: string, options: Options): Promise<any> {
        Logger.log(TAG, `url = ${url}, options = ${JSON.stringify(options)}`);

        return FetchHelper.timeoutFetch(
            fetch(url, {
                method: options.method,
                headers: options.headers,
                body: options.body
            })
        );
    }
}
