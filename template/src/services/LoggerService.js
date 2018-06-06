/**
 * Custom Class used for logging, currently experimental - will be advanced
 */
export default class LoggerService {
    constructor() {
    }

    /**
     * Get the current Date in hh:mm:ss format
     * 
     * @return {Timestamp String}
     */
    getTimestamp() {
        const date = new Date;

        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hour = date.getHours();

        return hour + ':' + minutes + ':' + seconds;
    }

    /**
     * Console Log Wrapper
     * 
     * @param  {args}
     * @return {void}
     */
    log(...args) {
        args.unshift(this.getTimestamp() + ' - ');

        console.log.apply(this, args); // eslint-disable-line no-console
    }

    /**
     * Console Warn Wrapper
     * 
     * @param  {args}
     * @return {void}
     */
    warn(...args) {
        args.unshift(this.getTimestamp() + ' - ');

        console.warn.apply(this, args);
    }

    /**
     * Console Error Wrapper
     * 
     * @param  {args}
     * @return {void}
     */
    error(...args) {
        args.unshift(this.getTimestamp() + ' - ');

        console.error.apply(this, args);
    }
}