import AuraHttp from "./AuraHttp";

export enum Method {
    GET = 'GET',
    POST = 'POST'
}

export default interface Options {
    baseUrl?: string;
    method?: Method;
    headers?: any;
    body?: any;
    params?: any;
    connectTimeout?: number;
    readTimeout?: number;
    writeTimeout?: number;
}

export class OptionBuilder {
    private _method?: Method;
    private _baseUrl?: string;
    private _headers?: any;
    private _body?: any;
    private _params?: any;
    private _connectTimeout?: number;
    private _readTimeout?: number;
    private _writeTimeout?: number;

    public method(value: Method): OptionBuilder {
        this._method = value;
        return this;
    }

    public baseUrl(value: string): OptionBuilder {
        this._baseUrl = value;
        return this;
    }

    public headers(value: any): OptionBuilder {
        this._headers = value;
        return this;
    }

    public body(value: any): OptionBuilder {
        this._body = value;
        return this;
    }

    public params(value: any): OptionBuilder {
        this._params = value;
        return this;
    }

    public connectTimeout(value: number): OptionBuilder {
        this._connectTimeout = value;
        return this;
    }

    public readTimeout(value: number): OptionBuilder {
        this._readTimeout = value;
        return this;
    }

    public writeTimeout(value: number): OptionBuilder {
        this._writeTimeout = value;
        return this;
    }

    public build(): AuraHttp {
        let options: Options = {
            baseUrl: this._baseUrl,
            method: this._method,
            connectTimeout: this._connectTimeout,
            readTimeout: this._readTimeout,
            writeTimeout: this._writeTimeout,
            headers: this._headers,
            params: this._params,
            body: this._body
        };
        return new AuraHttp(options);
    }
}
