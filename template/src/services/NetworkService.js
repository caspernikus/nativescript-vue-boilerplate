import * as connectivityModule from "tns-core-modules/connectivity";
import { Observable } from "data/observable";

/**
 * NetworkService, detects and monitors network connection changes
 */
export default class NetworkService extends Observable {

    /**
     * Initially setup network connection and start monitoring for changes
     * 
     * @return {void}
     */
    constructor() {
        super();

        this.networkStatus = connectivityModule.getConnectionType();
        this.isOnline = this.checkIfOnline(connectivityModule.getConnectionType());

        this.monitorNetworkChange();
    }

    /**
     * Determine if Connection Type is offline or online
     * 
     * @param  ConnectionType {Integer}
     * @return {void}
     */
    checkIfOnline(connectionType) {
        return connectionType != connectivityModule.connectionType.none;
    }

    /**
     * Monitor for Network changes and emit an event if so
     * 
     * @return {void}
     */
    monitorNetworkChange() {
        connectivityModule.startMonitoring((newConnectionType) => {
            this.networkStatus = newConnectionType;
            this.isOnline = this.checkIfOnline(newConnectionType);

            this.notify({
                eventName: 'networkStatusChanged',
                object: this
            });
        });
    }
}