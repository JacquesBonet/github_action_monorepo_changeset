
# izberg-backoffice-store

izberg-backoffice-store is an abstraction of redux store, useful for creating Izberg web applications, without having to reconfigure redux. It also contains methods for common actions like fetching data from Izberg API, Izberg BO Settings, etc.

izberg-backoffice-store exposes several modules, with different levels of abstractions. 

`Models` contains all API-related operations, e.g. actions creators,selectors & fetch methods.

[Models documentation](#models)

There are selectors specific to BO environment, e.g. `currentApplication` or `isSellerBO`.

[BO Store documentation](#bo-store)


The most useful/interesting module might be `AsyncStore`. It allows third-party packages to quickly allocate a part of the state, with its own actions/reducers/selectors. It is also private (not accessible from other selectors). The state reducers are injected asynchronously, thus enable code-splitting and lazy-loading modules.

[AsyncStore documentation](#asyncstore)

<br/>

---
## API Reference

<a id="models"></a>
### `Models`

**`resourceKey`**

resource key string

**`_get({ id, queryParams }) -> Promise`**

performs a GET operation on a model. 

E.g. `Models.mapperConfiguration.get({ id: 2 })` will make an HTTP call to `/v1/mapper_configuration/2` and returns a promise

**`_collectionGet({ queryParams })`**

performs a GET operation to on model with query parameters. 

**`_collectionGetAll({ queryParams })`**

performs some GET operations to on model with query parameters, as many times as necessary to retrieve the entire data set regardless of the `limit`.

E.g. `Models.mapperConfiguration.collectionGet({ queryParams: { application: 1, order__by: 'status' }})` will make an HTTP call to `v1/mapper_configuration/?application=1&order__by=status`

**`_save(data) -> Promise`**

performs a save operation with `data` in request body (PUT request if `id` field exists in data, POST if it doesn't)

**`_patch({ id, data }) -> Promise`**

performs a GET operation on a model with `data` in request body

**`_delete({ id }) -> Promise`**

performs a DELETE operation on a model with `data` in request body

**`executeAction({ id, action, options }) -> Promise`**

performs custom operation on model. E.g.

```javascript
// no id is provided
Models.application.executeAction({ action: 'batch_start' }) 
// --> will call /v1/application/batch_start

// id is provided
Models.application.executeAction({ id: 42, action: 'pause' }) 
// --> will call /v1/application/42/pause
```

options: 
- type: http type. one of 'GET', 'POST', 'PUT' 
- body: request body data (relevant in case of POST / PUT operations)
- queryParams: parameters for the request ( { application: 42 } )

**`get({ id, queryParams })`**

action creator that calls `_get` method and update redux state

**`save({ id })`**

action creator that calls `_save` method with current data in state, and update redux state with API response data

**`create({ model, method = _save })`**

action creator that calls `_save` method on model, and update redux state with API response data. `model` correspond to request body. The return value is a promise with the request's response

**`patch({ id, data })`**

action creator that calls `_patch` method and update redux state

**`collectionGet({ queryParams })`**

action creator that calls `_collectionGet` method and update redux state

**`collectionGetAll({ queryParams })`**

action creator that calls the `_collectionGetAll` to retrieve the entire data set regardless of the `limit`, then updates the redux state

**`delete({ ids })`**

action creator that calls `_delete` method and remove data from redux state. `ids` is a array of `id`

**`localUpdate({ data })`**

action creator that updates model data in state with argument `data` (a field `id` must exists in `data`)

**`localDelete({ ids })`**

action creator that removes models with id in `ids` list from state

**`fetchSchema()`**

action creator that fetches the model api schema and save in redux state

**`localGetById({ id })`**

selector that returns model with corresponding `id`

**`localGet({ queryParams })`**

selector that returns models list that match `queryParams`

**`getSchema()`**

selector that returns model api schema

---

### BO Store

**`currentApplication(state) -> application`**

return current application object

**`currentMerchant(state) -> merchant`**

return current merchant object

**`currentUser(state) -> user`**

return current logged user object

**`isSellerBO(state) -> boolean`**

return true if user is in BOS, false if BOO

---

### AsyncStore

**`inject(storeId: String, reducer: function) -> { getState: function }`**

inject asynchronously a reducer function in current store

- `storeId`: a global unique id to identify custom store
- `reducer(state, action) -> state`: a reducer that receives a partial state of the store

returns `getState(globalState) -> partialState`: a helper function that takes globalState as argument (provided by react-redux `mapStateToProps`), and returns partial state of the store. Useful for creating local selectors.

E.g.

```javascript
import { AsyncStore } from '@jb_scope1/izberg-backoffice-store';
const { getState } = AsyncStore.inject('my_store_id', (state, action) => state);

const mySelector = globalState => {
    const state = getState(globalState);
    const local_id = state.local_id;
    return Models.mapperConfiguration.localGetById({ id: local_id })(globalState);
};
```

