import Options from '../lib/Options';

export interface ResponseInterceptor {
    process(response: Response): Promise<Response>;
}
