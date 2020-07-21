const TAG = 'FetchUtils';
export default class FetchUtils {
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

    /**
     * 默认Fetch请求的最常超时时间
     * @param originFetch
     * @param timeout
     */
    public static timeoutFetch = (originFetch: Promise<any>, timeout = 15 * 1000) => {
        let timeoutBlock = (): any => {
        };
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
