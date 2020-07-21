export interface HttpResponse {
    code: number;
    message: any;
    data: any;
    url?: string;
    debug?: boolean;
}
