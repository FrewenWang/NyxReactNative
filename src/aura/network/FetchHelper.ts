import Options from './lib/Options';

const TAG = 'FetchHelper';
export default class FetchHelper {
    public static releaseResponse(response: Response): void {
        try {
            // @ts-ignore
            response && response._bodyInit && response._bodyInit.close();
        } catch (e) {
            console.log(TAG, e);
        }
    }

    public static handleUrl(url: string, param: any): string {
        if (param) {
            let paramsArray: any = [];
            Object.keys(param).forEach((key: string) => paramsArray.push(key + '=' + encodeURIComponent(param[key])));
            if (url.search(/\?/) === -1) {
                if (typeof param === 'object') {
                    url += '?' + paramsArray.join('&');
                }
            } else {
                url += '&' + paramsArray.join('&');
            }
        }
        return url;
    }

    public static addDefaultHeaders(options: Options): Options {
        if (!options.headers) {
            options.headers = {Accept: 'application/json'};
        } else {
            options.headers = 'application/json';
        }
        return options;
    }

    /**
     * 默认Fetch请求的最长超时时间，默认是30秒
     * @param originFetch
     * @param timeout
     */
    public static timeoutFetch = (originFetch: Promise<any>, timeout = 30000) => {
        let timeoutBlock = (): any => {};
        let timer = setTimeout(() => {
            timeoutBlock();
        }, timeout);

        let timeoutPromise = new Promise((resolve, reject) => {
            timeoutBlock = () => {
                reject('HttpEngine3 Timeout of no Response');
            };
        });

        let racePromise = Promise.race([
            originFetch.then((result: any) => {
                timer && clearTimeout(timer);
                return result;
            }),
            timeoutPromise,
        ]);

        return racePromise;
    };
}
