/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2024 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import { UsersResource } from '@cloudbeaver/core-authentication';
import { Button, type ButtonProps, useTranslate } from '@cloudbeaver/core-blocks';
import { useService } from '@cloudbeaver/core-di';
import { CommonDialogService, DialogueStateResult } from '@cloudbeaver/core-dialogs';

import { AdministrationUsersManagementService } from '../../../AdministrationUsersManagementService.js';
import { DeleteUserDialog } from './DeleteUserDialog.js';
import { DisableUserDialog } from './DisableUserDialog.js';

interface Props extends ButtonProps {
  userId: string;
  enabled: boolean;
  onDisable: VoidFunction;
}

export const AdministrationUserFormDeleteButton: React.FC<Props> = function AdministrationUserFormDeleteButton({
  userId,
  enabled,
  onDisable,
  ...rest
}) {
  const translate = useTranslate();
  const commonDialogService = useService(CommonDialogService);
  const administrationUsersManagementService = useService(AdministrationUsersManagementService);
  const usersResource = useService(UsersResource);

  const userManagementDisabled = administrationUsersManagementService.externalUserProviderEnabled;
  const deleteDisabled = usersResource.isActiveUser(userId) || userManagementDisabled;

  if (deleteDisabled) {
    return null;
  }

  async function openUserDeleteDialog() {
    await commonDialogService.open(DeleteUserDialog, {
      userId,
    });
  }

  async function deleteUser() {
    if (enabled) {
      const result = await commonDialogService.open(DisableUserDialog, {
        userId,
        onDelete: openUserDeleteDialog,
      });

      if (result === DialogueStateResult.Rejected) {
        return;
      }

      onDisable();
    } else {
      await openUserDeleteDialog();
    }
  }

  return (
    <Button {...rest} mod={['outlined']} onClick={deleteUser}>
      {translate('ui_delete')}
    </Button>
  );
};
