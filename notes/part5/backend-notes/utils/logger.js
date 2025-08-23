const silent = process.env.LOG_SILENT === "true";

const info = (...params) => {
  if (!silent) {
    console.log(...params);
  }
};

const error = (...params) => {
  if (!silent) {
    console.error(...params);
  }
};

module.exports = { info, error };
