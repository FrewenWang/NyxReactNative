import Options from '../lib/Options';

export interface MainRequestInterceptor {
    process(url: string, options: Options): Promise<Response>;
}
