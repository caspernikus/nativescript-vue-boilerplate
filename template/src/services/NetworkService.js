import * as connectivityModule from "tns-core-modules/connectivity";
import { Observable } from "data/observable";

export default class NetworkService extends Observable {
    constructor() {
        super();

        this.networkStatus = connectivityModule.getConnectionType();
        this.isOnline = this.checkIfOnline(connectivityModule.getConnectionType());

        this.monitorNetworkChange();
    }

    checkIfOnline(connectionType) {
        return connectionType != connectivityModule.connectionType.none;
    }

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