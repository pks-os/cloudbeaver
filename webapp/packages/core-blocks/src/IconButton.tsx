/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import { observer } from 'mobx-react-lite';
import type React from 'react';
import { Button, ButtonProps } from 'reakit/Button';

import { Icon } from './Icon';
import IconButtonStyles from './IconButton.m.css';
import { s } from './s';
import { StaticImage } from './StaticImage';
import { useS } from './useS';

interface Props {
  name: string;
  img?: boolean;
  viewBox?: string;
}

export type IconButtonProps = Props & ButtonProps;

export const IconButton: React.FC<IconButtonProps> = observer(function IconButton({ name, img, viewBox, className, ...rest }) {
  const styles = useS(IconButtonStyles);

  return (
    <Button {...rest} className={s(styles, { iconButton: true }, className)}>
      {img && <StaticImage className={s(styles, { staticImage: true })} icon={name} />}
      {!img && <Icon className={s(styles, { icon: true })} name={name} viewBox={viewBox} />}
    </Button>
  );
});
