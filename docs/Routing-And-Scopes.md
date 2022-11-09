# Routing and Scopes

This documentation describes how the backoffice routing and scopes/rights system works

## Summary
- [How it works](#how-it-works)

## How it works

An array of all backoffice routes is in a [route file](https://github.com/izberg-marketplace/izberg-backoffice-ui/tree/master/backoffices/front/src/routes/index.js)
This array get all routes objects from different izberg packages and merge it into one array.
If a new package is created or if a new route have to be added, it must be added in this array.

A route object should respect this model:
```
    {
        name: [String], String, // The name of the route, used when using goTo function (@jb_scope1/nav) or in Sidebar 
        path: String, // The path of the route, used with history object to show or not a route
        key: String, // Used to differentiates route 
        label: String, // The label shown in Sidebar (if the Sidebar component calls it) 
        exact: Boolean, // If true, the route will only be shown if the path is strictly exact
        component: Component, // The component shown by the route
        scopes: [String], // The array of scope to control if the user has rights to access the route
    }
```

Each route object should contains an array of scopes, which will be required to be accessed and to be included in the backoffice.

When the backoffice is initializing, a RouterView component will check all routes and will verify if the route required scopes matches with the user scopes.
If the user rights match with one of the route scope, then the route will be registered in a route reducer.
If the user rights doesn’t match, but the route exists, then a 403 page will be created.
If no routes matches with url, then a 404 page will be showed.

Shortly, a user can only access if one scopes of the route object match with the user scopes in the roleScopes reducer.

## Add a conditional route depending of a LaunchDarkly feature-flag
To add a route depending of a feature flag, you must add it in the role-scopes saga (izberg-backoffice-credentials/src/store/sagas/role-scopes), in the getFeatureFlagsScopes function

## Add a conditional route depending of an application settings
To add a route depending of a feature flag, you must add it in the role-scopes saga (izberg-backoffice-credentials/src/store/sagas/role-scopes), in the getAppSettingsScopes function
