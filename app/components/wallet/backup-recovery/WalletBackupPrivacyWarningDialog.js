// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import Checkbox from 'react-polymorph/lib/components/Checkbox';
import SimpleCheckboxSkin from 'react-polymorph/lib/skins/simple/raw/CheckboxSkin';
import { defineMessages, intlShape } from 'react-intl';
import SvgInline from 'react-svg-inline';
import Dialog from '../../widgets/Dialog';
import DialogCloseButton from '../../widgets/DialogCloseButton';
import WalletRecoveryInstructions from './WalletRecoveryInstructions';
import globalMessages from '../../../i18n/global-messages';
import styles from './WalletBackupPrivacyWarningDialog.scss';
import recoveryWatchingSvg from '../../../assets/images/recovery-watching.inline.svg';

const messages = defineMessages({
  recoveryPhraseInstructions: {
    id: 'wallet.backup.privacy.warning.dialog.recoveryPhraseInstructions',
    defaultMessage: `!!!On the following screen, you will see a set of 15 random words. This is
    your wallet backup phrase. It can be entered in any version of Daedalus application in order
    to back up or restore your wallet’s funds and private key.`,
    description: 'Instructions for backing up wallet recovery phrase on dialog that displays wallet recovery phrase.'
  },
  buttonLabelContinue: {
    id: 'wallet.backup.privacy.warning.dialog..button.labelContinue', // TODO: fix translation key path 'dialog..button'
    defaultMessage: '!!!Continue',
    description: 'Label for button "Continue" on wallet backup dialog'
  },
  termNobodyWatching: {
    id: 'wallet.backup.privacy.warning.dialog.checkbox.label.nobodyWatching',
    defaultMessage: '!!!Make sure nobody looks into your screen unless you want them to have access to your funds.',
    description: 'Label for the checkbox on wallet backup dialog describing that nobody should be watching when recovery phrase is shown'
  }
});

type Props = {
  countdownRemaining: number,
  canPhraseBeShown: boolean,
  isPrivacyNoticeAccepted: boolean,
  onAcceptPrivacyNotice: Function,
  onContinue: Function,
  onCancelBackup: Function,
  oldTheme: boolean
};

@observer
export default class WalletBackupPrivacyWarningDialog extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const {
      countdownRemaining,
      canPhraseBeShown,
      onAcceptPrivacyNotice,
      onCancelBackup,
      isPrivacyNoticeAccepted,
      onContinue,
      oldTheme
    } = this.props;
    const countdownDisplay = countdownRemaining > 0 ? ` (${countdownRemaining})` : '';
    const dialogClasses = classnames([
      styles.component,
      'WalletBackupPrivacyWarningDialog',
    ]);
    const checkboxClasses = oldTheme ? styles.checkboxOld : styles.checkbox;

    const actions = [
      {
        label: intl.formatMessage(messages.buttonLabelContinue) + countdownDisplay,
        onClick: onContinue,
        disabled: !canPhraseBeShown,
        primary: true
      }
    ];

    return (
      <Dialog
        className={dialogClasses}
        title={intl.formatMessage(globalMessages.recoveryPhraseDialogTitle)}
        actions={actions}
        closeOnOverlayClick
        onClose={onCancelBackup}
        closeButton={<DialogCloseButton onClose={onCancelBackup} />}
        oldTheme={oldTheme}
      >
        {!oldTheme && <SvgInline className={styles.recoveryImage} svg={recoveryWatchingSvg} cleanup={['title']} />}
        <WalletRecoveryInstructions
          instructionsText={intl.formatMessage(messages.recoveryPhraseInstructions)}
          oldTheme={oldTheme}
        />
        <div className={checkboxClasses}>
          <Checkbox
            label={intl.formatMessage(messages.termNobodyWatching)}
            onChange={onAcceptPrivacyNotice}
            checked={isPrivacyNoticeAccepted}
            skin={<SimpleCheckboxSkin />}
          />
        </div>
      </Dialog>
    );
  }

}
