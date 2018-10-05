const checkYarnInstall = function() {
  console.log('process.env.npm_execpath: ', process.env.npm_execpath);
  const isUsingYarn = process.env.npm_execpath.includes('yarn');
  /* eslint-disable no-console */
  console.log(`Using yarn: ${isUsingYarn}`);
  console.log(`  (npm_execpath: "${process.env.npm_execpath}")\n`);
  /* eslint-enable no-console */
  if (!isUsingYarn) {
    throw new Error('You must use Yarn to install dependencies, not NPM');
  }
};

checkYarnInstall();
