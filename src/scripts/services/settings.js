// @flow

const defaultSettings = {
    currentBlockId: 1
};

export function getAppSettings(options: {} = {}): Promise<any> {
    const {} = options;
    return new Promise((resolve, error) => {
        setTimeout(() => resolve(defaultSettings), 2000);
    });
}

export function setAppSettings(options: {} = {}) {
    const {} = options;
}
