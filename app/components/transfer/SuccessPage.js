// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { intlShape } from 'react-intl';
import styles from './SuccessPage.scss';
import SuccessIcon from '../../assets/images/transfer-success.inline.svg';

type Props = {|
  +title: string,
  +text: string,
  +classicTheme: boolean
|};

@observer
export default class SuccessPage extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const { title, text } = this.props;

    return (
      <div className={styles.component}>
        <div>
          <SuccessIcon />
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.text}>
            {text}
          </div>
        </div>
      </div>
    );
  }
}
