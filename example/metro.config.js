// Metro config for the docs app. It consumes the library from the parent
// `../src` folder (aliased to `gofi-ui-native` in babel.config.js), so Metro
// must watch that source and resolve its dependencies from example/node_modules.
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const libRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch the library source so edits hot-reload in the docs.
config.watchFolders = [path.resolve(libRoot, 'src')];

// Resolve all packages (react-native, svg, lucide…) from the example's own
// node_modules, even for files living under ../src.
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
