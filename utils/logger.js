const getTimestamp = () => {
  return new Date().toISOString();
};

const log = (message) => {
  console.log(`[${getTimestamp()}] INFO: ${message}`);
};

const error = (message) => {
  console.error(`[${getTimestamp()}] ERROR: ${message}`);
};

module.exports = {
  log,
  error,
};
