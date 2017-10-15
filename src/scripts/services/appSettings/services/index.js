// @flow

type Settings = {
    data: {
        currentBlockId: number
    }
};

const defaultSettings: Settings = {
    data: {
        currentBlockId: 1
    }
};

export function getAppSettings(options: {} = {}): Promise<any> {
    // const {} = options;
    return new Promise((resolve, error) => {
        setTimeout(() => {
            const settings = JSON.parse( window.localStorage.getItem('settingsData')) || defaultSettings;
            resolve(settings);
        }, 0);
    });
}

export function setAppSettings(settingsData: Settings) {
    window.localStorage.setItem('settingsData', JSON.stringify(settingsData));
}
