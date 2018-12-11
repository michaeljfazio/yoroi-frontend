import environment from '../../environment';

const networkForLocalStorage = String(environment.NETWORK);
const storageKeys = {
  USER_LOCALE: networkForLocalStorage + '-USER-LOCALE',
  TERMS_OF_USE_ACCEPTANCE: networkForLocalStorage + '-TERMS-OF-USE-ACCEPTANCE',
  THEME: networkForLocalStorage + '-THEME',
  LOCK: networkForLocalStorage + '-LOCK-SCREEN',
  PIN: networkForLocalStorage + '-PIN',
  PIN_WAS_SAVED: networkForLocalStorage + '-PIN-WAS-SAVED',
  APP_IS_LOCKED: networkForLocalStorage + '-APP_IS_LOCKED',
};

/**
 * This api layer provides access to the electron local storage
 * for user settings that are not synced with any coin backend.
 */

export default class LocalStorageApi {

  getUserLocale = (): Promise<string> => new Promise((resolve, reject) => {
    try {
      const locale = localStorage.getItem(storageKeys.USER_LOCALE);
      if (!locale) return resolve('');
      resolve(locale);
    } catch (error) {
      return reject(error);
    }
  });

  setUserLocale = (locale: string): Promise<void> => new Promise((resolve, reject) => {
    try {
      localStorage.setItem(storageKeys.USER_LOCALE, locale);
      resolve();
    } catch (error) {
      return reject(error);
    }
  });

  unsetUserLocale = (): Promise<void> => new Promise((resolve) => {
    try {
      localStorage.removeItem(storageKeys.USER_LOCALE);
      resolve();
    } catch (error) {} // eslint-disable-line
  });

  getTermsOfUseAcceptance = (): Promise<boolean> => new Promise((resolve, reject) => {
    try {
      const accepted = localStorage.getItem(storageKeys.TERMS_OF_USE_ACCEPTANCE);
      if (!accepted) return resolve(false);
      resolve(JSON.parse(accepted));
    } catch (error) {
      return reject(error);
    }
  });

  setTermsOfUseAcceptance = (): Promise<void> => new Promise((resolve, reject) => {
    try {
      localStorage.setItem(storageKeys.TERMS_OF_USE_ACCEPTANCE, true);
      resolve();
    } catch (error) {
      return reject(error);
    }
  });

  unsetTermsOfUseAcceptance = (): Promise<void> => new Promise((resolve) => {
    try {
      localStorage.removeItem(storageKeys.TERMS_OF_USE_ACCEPTANCE);
      resolve();
    } catch (error) {} // eslint-disable-line
  });

  getLockScreenEnabled = (): Promise<boolean> => new Promise((resolve, reject) => {
    try {
      const enabled = localStorage.getItem(storageKeys.LOCK);
      if (!enabled) return resolve(false);
      resolve(JSON.parse(enabled));
    } catch (error) {
      return reject(error);
    }
  });

  setLockScreenEnabled = (): Promise<void> => new Promise((resolve, reject) => {
    try {
      localStorage.setItem(storageKeys.LOCK, true);
      resolve();
    } catch (error) {
      return reject(error);
    }
  });

  unsetLockScreenEnabled = (): Promise<void> => new Promise((resolve) => {
    try {
      localStorage.removeItem(storageKeys.LOCK);
      resolve();
    } catch (error) {} // eslint-disable-line
  });

  getPinCode = (): Promise<boolean> => new Promise((resolve, reject) => {
    try {
      const pin = localStorage.getItem(storageKeys.PIN);
      if (!pin) return resolve('');
      resolve(pin);
    } catch (error) {
      return reject(error);
    }
  });

  getPinCodeUpdateTime = (): Promise<any> => new Promise((resolve, reject) => {
    try {
      const time = localStorage.getItem(storageKeys.PIN_WAS_SAVED);
      if (!time) return resolve();
      resolve(time);
    } catch (error) {
      return reject(error);
    }
  });

  setPinCode = (code: string, updated: number): Promise<void> => new Promise((resolve, reject) => {
    try {
      localStorage.setItem(storageKeys.PIN, code);
      localStorage.setItem(storageKeys.PIN_WAS_SAVED, String(updated));
      resolve();
    } catch (error) {
      return reject(error);
    }
  });

  unsetPinCode = (): Promise<void> => new Promise((resolve) => {
    try {
      localStorage.removeItem(storageKeys.PIN);
      resolve();
    } catch (error) {} // eslint-disable-line
  });

  checkAppLocked = (): Promise<boolean> => new Promise((resolve, reject) => {
    try {
      const locked = localStorage.getItem(storageKeys.APP_IS_LOCKED);
      if (!locked) return resolve(false);
      resolve(JSON.parse(locked));
    } catch (error) {
      return reject(error);
    }
  });

  toggleAppLocked = (): Promise<void> => new Promise((resolve, reject) => {
    try {
      const locked = localStorage.getItem(storageKeys.APP_IS_LOCKED);
      localStorage.setItem(storageKeys.APP_IS_LOCKED, !(JSON.parse(locked)));
      resolve();
    } catch (error) {
      return reject(error);
    }
  });

  unsetAppLocked = (): Promise<void> => new Promise((resolve) => {
    try {
      localStorage.removeItem(storageKeys.APP_IS_LOCKED);
      resolve();
    } catch (error) {} // eslint-disable-line
  });

  async reset() {
    await this.unsetUserLocale(); // TODO: remove after saving locale to API is restored
    await this.unsetTermsOfUseAcceptance();
    await this.unsetLockScreenEnabled();
    await this.unsetPinCode();
    await this.unsetAppLocked();
  }

}
