# Debugging

This documentation lists different tools available to debug backoffice server code (for frontend code, use chrome devtools as always).

## Summary

- [Debug logs](#debug-logs)
- [Node debugger](#node-debugger)

## Debug logs

In `backoffices/server/.env` file you can alter `DEBUG` environment variable to display certain debug logs. The possible values are :

- `bo:routes` : enable route logs
- `bo:mw`: enable middleware logs 
- `bo:boundaries`: enable boundaries (code that interacts with external services) logs
- `bo:utils`: enable utils logs
- `bo:*`: enable all debug logs
- other values: lots of other node packages use the same [debug](https://www.npmjs.com/) utility package so you can use this env var to debug other package code as well.
- `*`: let's chaos begin !!

## Node debugger

In some case you'd like to inspect code using breakpoints. It's possible using start in debug mode command:

```sh
cd backoffices/server
yarn debug
```

Then you can go to [chrome://inspect](chrome://inspect) to access debug devtools & put some breakpoints.

For more information, see node [debugging guide](https://nodejs.org/en/docs/guides/debugging-getting-started/).

