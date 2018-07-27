/**
 * Custom Class used for logging, currently experimental - will be advanced
 */
export default class LoggerService {
    constructor() {
    }

    /**
     * Console Log Wrapper
     * @param  {[string]} text
     * @return {[void]}
     */
    log(text) {
        console.info('\x1b[36m' + text, '\x1b[0m'); // eslint-disable-line no-console
    }

    /**
     * Console Info Wrapper
     * @param  {[string]} text
     * @return {[void]}
     */
    info(text) {
        console.info('\x1b[37m' + text, '\x1b[0m'); // eslint-disable-line no-console
    }

    /**
     * Console Warn Wrapper
     * @param  {[string]} text
     * @return {[void]}
     */
    warn(text) {
        console.info('\x1b[32m' + text, '\x1b[0m'); // eslint-disable-line no-console
    }

    /**
     * Console Error Wrapper
     * @param  {[string]} text
     * @return {[void]}
     */
    error(text) {
        console.info('\x1b[31m' + text, '\x1b[0m'); // eslint-disable-line no-console
    }
}