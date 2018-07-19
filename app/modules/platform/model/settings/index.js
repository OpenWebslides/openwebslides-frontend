// @flow
/* eslint-disable no-multiple-empty-lines */

import * as sidebars from './sidebars';


// Types for each user setting ---------------------------------------------------------------------

export type UserSettingActiveSidebarIds = {|
  +activeSidebarIds: Array<sidebars.SidebarId>,
|};


// Type for single user setting --------------------------------------------------------------------

// Note: need this separate union type of user settings to be able to typecheck the action
// #TODO see if there is a better way to do this
export type UserSetting =
  | UserSettingActiveSidebarIds;


// Type for UserSettings object  -------------------------------------------------------------------

export type UserSettings = {|
  ...UserSettingActiveSidebarIds,
|};


// Exports -----------------------------------------------------------------------------------------

export * from './sidebars';
