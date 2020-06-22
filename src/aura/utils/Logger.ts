export default class Logger {
    public static log(message?: any, ...optionalParams: any[]): void {
        console.log(message, optionalParams);
    }

    public static info(message?: any, ...optionalParams: any[]): void {
        console.info(message, optionalParams);
    }

    public static error(message?: any, ...optionalParams: any[]): void {
        console.error(message, optionalParams);
    }

    public static debug(message?: any, ...optionalParams: any[]): void {
        if (__DEV__) {
            console.debug(message, optionalParams);
        }
    }

    public static trace(message?: any, ...optionalParams: any[]): void {
        console.trace(message, optionalParams);
    }
}
