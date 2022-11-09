Linking modules allow developer to work in local environment, & see their modifications. This documentation explains how to use it in Izberg development environment.

Linking it's done using yarn link. For more information: https://yarnpkg.com/lang/en/docs/cli/link/

- [Link normal modules](#link-normal-modules)
- [Link prebuilt modules](#link-prebuilt-modules)

### Link normal modules
Most modules are not prebuilt, except `izberg-ui-beta`, `izberg-backoffice-store`, and `nav`. For those modules, see [Link prebuilt modules](#link-prebuilt-modules)

To link normal module:
```
cd izberg-backoffice-ui/packages/<module-name>
yarn link

# go to backoffices folder, or other project that's need linking
cd izberg-backoffices/izberg/<operator-backoffice|seller-backoffice>
yarn link @jb_scope1/<module-name>
```

E.g., to link izberg-backoffice-sellers-js to BOO:
```
cd izberg-backoffice-ui/packages/izberg-backoffice-sellers-js
yarn link
cd izberg-backoffices/izberg/operator-backoffice
yarn link @jb_scope1/izberg-backoffice-sellers-js
```
From here all modifications from sellers-js should take effect in BOO (with npm run bundle:watch running).

### Link prebuilt modules
`izberg-ui-beta`, `izberg-backoffice-store`, and `nav` are prebuilt modules, meaning they are compiled from ES6 down to ES5 before publishing. This ease consumption of the module (it's ready to use it directly, no need to configure an extra babel transpilation step).

However, in local environment, this complicates linking a little bit. To work with prebuilt modules, developer needs to do following step:
```
# First, build:watch the module
cd izberg-backoffice-ui/packages/<module-name>
yarn build:watch

# The built folder is located in <module-name>/build
# This is where we run yarn link
cd build
yarn link
# (Notes: sometimes this command might fail because package.json does not exist in <module-name>/build. You'll need to copy it from <module-name>)

# the rest is the same
cd izberg-backoffices/izberg/<operator-backoffice|seller-backoffice>
yarn link @jb_scope1/<module-name>
```

E.g., to link ui-beta with BO v3
```
cd izberg-backoffice-ui/packages/izberg-ui-beta
yarn build:watch
cd izberg-backoffice-ui/packages/izberg-ui-beta/build
yarn link
cd backoffices/packages/front
yarn link @jb_scope1/izberg-ui-beta
```

### Known errors
It is sometimes possible that a pre built package was linked by mistake
You can see all the links by typing this command
```
ls -la ~/.config/yarn/link/@izberg
```
A prebuilt package like izberg-ui-beta must be linked to <project_path>/izberg-backoffice-ui/packages/izberg-ui-beta/build

If it's linked to <project_path>/izberg-backoffice-ui/packages/izberg-ui-beta by example, you must unlink
```
cd izberg-backoffice-ui/packages/izberg-ui-beta
yarn unlink
cd build
yarn link
```
