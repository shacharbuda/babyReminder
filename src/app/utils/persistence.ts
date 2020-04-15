import consts from './constants';

export const PERSISTENCE_CODES = {
  VERSION: 'VERSION',
}

function handleVersion() {
  if (isNewVersion()) {
    // Alert user for new version!
    alert('גרסה חדשה!');

    updateUserVersion();
  }
}

function isNewVersion() {
  // New version check
  const serverVersion = consts.APP_VERSION;
  const userVersion = localStorage.getItem(PERSISTENCE_CODES.VERSION);
  return (!userVersion || userVersion !== serverVersion);
}

function updateUserVersion() {
  const serverVersion = consts.APP_VERSION;
  localStorage.setItem(PERSISTENCE_CODES.VERSION, serverVersion);
}

export default {
  isNewVersion,
  updateUserVersion,
  handleVersion,
};