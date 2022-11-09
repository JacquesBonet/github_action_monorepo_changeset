const nodeModulesRootDir = `${__dirname}/../node_modules`;

const alias = {
    'autocomplete.js': `${nodeModulesRootDir}/autocomplete.js/src/jquery/plugin.js`,
    typeahead: `${nodeModulesRootDir}/typeahead.js`,
};

const resolve = (appDir = '.') => ({
    resolve: {
        alias,
        modules: [ './node_modules', `${appDir}/node_modules`, nodeModulesRootDir],
    },
});

module.exports = {
    resolve,
    alias,
};
