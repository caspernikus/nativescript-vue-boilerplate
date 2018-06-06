export default class LoggerService {
    constructor() {
    }

    getTimestamp() {
        const date = new Date;

        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hour = date.getHours();

        return hour + ':' + minutes + ':' + seconds;
    }

    log(...args) {
        args.unshift(this.getTimestamp() + ' - ');

        console.log.apply(this, args); // eslint-disable-line no-console
    }

    warn(...args) {
        args.unshift(this.getTimestamp() + ' - ');

        console.warn.apply(this, args);
    }

    error(...args) {
        args.unshift(this.getTimestamp() + ' - ');

        console.error.apply(this, args);
    }
}