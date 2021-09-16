import React, { FC, useState } from 'react';

import { colors } from '../atoms/constans';
import core from '../core';
import { isValidUsername } from '../lib/utils';
import { IUser } from '../types';
import Input from './Input';

interface Props {
  value: string,
  onChange: (value: string) => void,
  onValidityChange: (status: number) => void,
  defaultValidity?: number,
  user?: IUser,
}

const UsernameChecker: FC<Props> = ({ onValidityChange, defaultValidity, user, ...props }) => {
  const [checking, setChecking] = useState(false);
  const [validity, setValidity] = useState(defaultValidity || 0);

  async function checkUsername() {
    if (props.value === '') return;

    if (props.value.toLowerCase() === user?.username) {
      setValidity(2);
      onValidityChange(2);
      return;
    }

    if (!isValidUsername(props.value)) {
      setValidity(1);
      return;
    }
    if (checking) return;
    setChecking(true);
    setValidity(0);    

    const response = await core.api.get(`users?q=${props.value.toLowerCase()}`);

    const x = response.status === 200 && response.data.available ? 2 : 1;
    setValidity(x);
    onValidityChange(x);
    setChecking(false);
  }

  return (
    <Input 
      type="text" 
      id="username" 
      name="username" 
      loading={checking}
      {...props}
      borderColor={validity === 1 
        ? colors.RED 
        : validity === 2 
        ? colors.GREEN
        : undefined}
      onKeyDown={() => { setValidity(0); onValidityChange(0) }}
      onDoneTyping={checkUsername}
      onBlur={checkUsername} />
  )
}

export default UsernameChecker;