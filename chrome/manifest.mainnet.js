// @flow

import buildManifest from './manifest.template';
import { SEIZA_URL, SEIZA_FOR_YOROI_URL } from './manifestEnvs';

export default buildManifest({
  description: 'A simple, secure and fast Cardano ADA wallet.',
  defaultTitle: 'Yoroi',
  titleOverride: true,
  contentSecurityPolicy: `default-src 'self'; frame-src ${SEIZA_FOR_YOROI_URL} ${SEIZA_URL} https://connect.trezor.io/ https://emurgo.github.io/yoroi-extension-ledger-bridge; script-src 'self' 'unsafe-eval' blob:; connect-src https://iohk-mainnet.yoroiwallet.com wss://iohk-mainnet.yoroiwallet.com:443; style-src * 'unsafe-inline' 'self' blob:; img-src 'self' data:;`,
  geckoKey: '{530f7c6c-6077-4703-8f71-cb368c663e35}',
});
