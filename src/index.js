class Sensor {
    constructor(getid) {
        this.id = getid;
        this.powerStatus = 'off';
        this.reportingInterval = 10000;
    }

    turn(onoff) {
        if (this.powerStatus === 'on' && onoff === 'on') throw new Error();
        this.powerStatus = onoff;
        this.status = 'idle';

        setTimeout(() => {
            this.status = 'sensingDistance';
        }, this.reportingInterval);
        const under500 = Math.random() * 500;
        setTimeout(() => {
            this.status = 'reportingData';
        }, this.reportingInterval + Math.floor(under500));
        // console.log(this.reportingInterval + Math.floor(under500), 'addnum' + Math.floor(under500));
        const under1000 = Math.random() * 1000;
        setTimeout(() => {
            this.status = 'idle';
        }, this.reportingInterval + Math.floor(under500) + Math.floor(under1000));
        // console.log(
        //     this.reportingInterval + Math.floor(under500) + Math.floor(under1000),
        //     'addnum' + Math.floor(under1000),
        // );
    }
}

class IotServer {
    constructor() {
        this.getsensor = [];
    }

    start(sensor) {
        this.getsensor.push(...sensor);
    }

    publish({ deviceId, actionId, payload }) {
        for (const sensor of this.getsensor) {
            if (sensor.id === deviceId && sensor.powerStatus === 'on' && actionId === 'CHANGE_REPORTING_INTERVAL') {
                return (sensor.reportingInterval = payload);
            }
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};
