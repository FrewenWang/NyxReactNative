import Options from '../lib/Options';

export interface RequestInterceptor {
    process(options: Options): Promise<Options>;
}
