# Localization

This documentation explains how we handle localization in backoffice code, and the complete process from putting localizable string in local code to perform translations in production environment.

## Summary

- [Tools](#tools)
- [Localization Process](#localization-process)
- [Guides](#guide)
  - [Update translation files locally](#update-translation-files-locally)
  - [Merge new translations during deployment](#merge-new-translations-during-deployment)

## Tools

Here are the tools we use to handle localization

- [i18next](https://www.i18next.com/) in code level to display localized texts  
- [transifex](https://transifex.com/) to provide a collaborative platform to translate texts from english to other languages

## Localization Process

1. The developer adds localizable text in the code, e.g.

```javascript
t('Your order has been confirmed')
```

For more information, see [i18next Essentials](https://www.i18next.com/translation-function/essentials).

2. The developer adds the text in translation source file `en/translation.json`, with the help of `yarn translate` tool (more about this in [Update translation files locally](#update-translation-files-locally)):

```json
{
    [...],
    "Your order has been confirmed": "Your order has been confirmed",
    [...]
}
```

3. The developer merges this code into `master` branch of izberg-backoffice-ui  

4. izbot synchronizes the code base translation sources with [Transifex](https://www.transifex.com/izberg-sas/backoffice/translate/#fr/$/79402748). This synchronization happens once a day. Izberg members can also trigger this synchronization manually in `#bot-transifex` channel, using this command:

```sh
izbot transifex
```

5. The translator translates the new text in Transifex 

6. The same bot script in step 4 synchronizes the text back from Transifex to the codebase, using Pull Requests.

7. The developer reviews & merges these Pull Requests

## Guides
### Update translation files locally 

Translations files are included in each package. Their location is always `translations/<lang>/translation.js`. 

In order for new translation keys to be uploaded in Transifex (which will be translated in other languages by other members, for more details see [Translation Process](WIP)), you need only add them into translation source file, which is in : `translations/en/translation.js`.

There is a script to automate this process. To update all packages:

```sh
yarn translate
```

Translations source files are now updated & just need to be committed into revision control.
 
To update a single package:

```sh
yarn translate --scope @jb_scope1/[package-name]
// e.g.
yarn translate --scope @jb_scope1/izberg-ui-beta
```

(`scope` is the same parameter as lerna's `scope`)

For more details about translation update scripts, see https://github.com/izberg-marketplace/izberg-backoffice-ui/blob/master/scripts/update-translation-keys.js


### Merge new translations during deployment

Review & merge these PRs created by `izberg-deploy`:

![Screenshot from 2020-08-19 10-20-55](https://user-images.githubusercontent.com/6483446/90610514-d1281400-e205-11ea-9808-9137fbe338a2.png)
