const fs = require('fs');
const path = require('path');

const checkNodeVersion = function() {
  const rootDir = path.resolve(__dirname, '../');
  const nvmrcVersion = fs.readFileSync(path.join(rootDir, '.nvmrc'), 'utf8').trim();
  const { version } = process;
  if (version !== nvmrcVersion) {
    let errorMsg = `NODE VERSION ERROR: The required node version, "${nvmrcVersion}", `;
    errorMsg += `does not match the system version, "${version}"`;
    throw new Error(errorMsg);
  } else {
    // eslint-disable-next-line no-console
    console.log(`NODE VERSION: "${nvmrcVersion}"`);
  }
};

checkNodeVersion();
