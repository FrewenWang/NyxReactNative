import {MainRequestInterceptor} from './MainRequestInterceptor';
import Options, {Method} from '../lib/Options';
import FetchHelper from '../FetchHelper';
import Logger from '../../utils/Logger';

const TAG = 'FetchMainRequest';

export class FetchMainRequest implements MainRequestInterceptor {
    async process(url: string, options: Options): Promise<Response> {
        let response;
        if (options.method === Method.GET) {
            response = await this.requestGet(url, options);
        } else if (options.method === Method.POST) {
            response = await this.requestPost(url, options);
        } else {
            throw 'request method should not be null';
        }
        if (response && response.ok) {
            FetchHelper.releaseResponse(response);
        } else {
            Logger.log(TAG, `httpRequest failed url = ${url}`);
        }
        return response;
    }

    private requestGet(url: string, options: Options): Promise<Response> {
        url = FetchHelper.handleUrl(url, options.params);
        return FetchHelper.timeoutFetch(
            fetch(url, {
                method: options.method,
                headers: options.headers,
            }),
        );
    }

    private requestPost(url: string, options: Options): Promise<Response> {
        let formData = new FormData();
        let param = options.params ? options.params : {};
        Object.keys(param).forEach((key) => {
            formData.append(key, param[key]);
        });

        return FetchHelper.timeoutFetch(
            fetch(url, {
                method: options.method,
                headers: options.headers,
                body: formData,
            }),
        );
    }
}
