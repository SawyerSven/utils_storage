import UStorage from './core/UStorage';

declare var window: Window & { UStorage: any };

window.UStorage = UStorage;