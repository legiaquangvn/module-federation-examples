# Microfrontends Angular 11

 
- This project shows an example of using Webpack 5 Module Federation with Angular `11` and sharing application state (NGXS library) between Angular host and Angular remote module.

  - host (`mdmf-shell`): Angular 11

  - remote 1 (`mdmf-profile`): Angular 11 app

  - remote 2 (`mdmf-react-ts`): React app using Typescript
    - this module to show that remote React component can be used by an Angular host
    - since each remote module is independant from other, this module can be easily removed from the host by:
      - remove the loading from `microfrontend.service.ts`, particular, remove the below code:
        ```js
        {

          // For Loading

          remoteEntry: 'http://localhost:4202/remoteEntry.js',

          remoteName: 'mdmfreactts',

          exposedModule: 'MyWrapperReactModule',

  

          // For Routing, enabling us to ngFor over the microfrontends and dynamically create links for the routes

          displayName: 'React',

          routePath: 'react',

          ngModuleName: 'MyWrapperReactModule',

        },
        ```

 

- the project was developed based on the the example `angular11-microfrontends`


- the use of **yarn** with **Webpack 5+** is required to override the webpack version for the angular cli

  - to specify Webpack 5, add `resolutions` into the `package.json` as similar as below

    ```json

    "resolutions": {

      "webpack": "5.6.0"

    },

    ```

- shared library (`mdmf-shared-libs`) provides application state (application store).

- shell (host) and profile (remote) can access the application store and dispatch actions etc.

  - the profile:

    - has a form to create an user, the user info is stored in the application state which is in the share module `mdmf-shared`

    - can show the list of users by selecting them from the common store and dispatch an action `RemoveUser` to remove an user.

  - the shell:

    - can show the list of users by selecting them from the common store and dispatch an action `RemoveUser` to remove an user.

 

  - when an user is added into or removed from the store, both shell and profile can see the changes.

 

## Running the demo

 

- Install packages:

  ```bash

  yarn install

  cd mdmf-shared-libs

  yarn install

  cd mdmf-profile

  yarn install

  cd ..

  cd mdmf-react-ts

  yarn install

  cd ..

  cd mdmf-shell

  yarn install

  cd ..
  
  ```

 - `lerna` may have to be installed globally, `yarn global add lerna` if that module is not found.
 
- Build the shared library and link it to all modules

  ```bash

  yarn build

  cd mdmf-shared-libs

  yarn link

  cd mdmf-profile

  yarn link "mdmf-shared-libs"

  cd ..

  cd mdmf-react-ts

  yarn link "mdmf-shared-libs"

  cd ..

  cd mdmf-shell

  yarn link "mdmf-shared-libs"

  cd ..

  ```

- Start the `yarn start`

 

Note: if there is any issue, just use the below manual approach:

  - `mdmf-shared-libs`:

    ```bash

    cd mdmf-shared-libs

    yarn install

    yarn build

    yarn link

    ```

  - `mdmf-shell`:

    ```bash

    cd mdmf-shell

    yarn install

    yarn link "mdmf-shared-libs"

    yarn start

    ```

  - `mdmf-profile`:

    ```bash

    cd mdmf-profile

    yarn install

    yarn link "mdmf-shared-libs"

    yarn start

    ```

  - `mdmf-react-ts`:

    ```bash

    cd mdmf-react-ts

    yarn install

    yarn link "mdmf-shared-libs"

    yarn start

    ```

- Open the shell http://localhost:4200

  ![Shell Screenshot](doc-images/shell.png)

 

- Click the `Profile` navigation link to load the remote profile module

  ![Profile Screenshot](doc-images/profile-module.png)

 

- Click the `React` navigation link to load the remote react module

  ![React Screenshot](doc-images/react-module.png)

 

- Each remote module can be accessed as stand-alone app.

  - Profile remote module:

    ![Profile Stand-alone Screenshot](doc-images/profile-module-standalone.png)

  - React remote module:

    ![React Stand-alone Screenshot](doc-images/react-module-standalone.png)

     "serve": "11.3.2",
    "webpack": "5.6.0",
    "webpack-cli": "4.1.0",
    "webpack-dev-server": "3.11.0"  

## Usage

 

- to run unit test `yarn test`

- to run e2e test `yarn e2e`

- to check linting `yarn lint`

- clean up the build `yarn clean`

- delete all node_modules directories `yarn remove:nodemodules`

  - need to install `trash-cli` globally `npm install --global trash-cli`

 

## Project Structure

 

### Shell (mdmf-shell)

 

- The shell project located in `mdmf-shell` folder, its contains the shell application which is used to load remote modules (Microfrontends) using dynamic routing constructed from the Microfrontend array (`microfrontend.service.ts`). The list of Microfrontends can be loaded from a config if required, but for the example it is just an hardcoded array.

  ```js

  loadConfig(): Microfrontend[] {

    return [

      {

        // For Loading

        remoteEntry: 'http://localhost:4201/remoteEntry.js',

        remoteName: 'profile',

        exposedModule: 'ProfileModule',

 

        // For Routing, enabling us to ngFor over the microfrontends and dynamically create links for the routes

        displayName: 'Profile',

        routePath: 'profile',

        ngModuleName: 'ProfileModule',

      },

      {

        // For Loading

        remoteEntry: 'http://localhost:4202/remoteEntry.js',

        remoteName: 'mdmfreactts',

        exposedModule: 'MyWrapperReactModule',

 

        // For Routing, enabling us to ngFor over the microfrontends and dynamically create links for the routes

        displayName: 'React',

        routePath: 'react',

        ngModuleName: 'MyWrapperReactModule',

      },

    ];

  }

  ```

  - a Microfrontend (remote module) can be added or removed from the host by modifying here.

 

- The share library (`mdmf-shared`) and Angular libraries are configured within the Module Federation config:

 

```js

plugins: [

  new ModuleFederationPlugin({

    shared: {

      "@angular/core": { eager: true, singleton: true },

      "@angular/common": { eager: true, singleton: true },

      "@angular/router": { eager: true, singleton: true },

      "@ngxs/store": {singleton: true, eager: true },

      "mdmf-shared": { singleton: true, eager: true },

    },

  }),

],

```

 

- Shared application state:

  - the application state contains an array of users.

  - both host and remote can dispatch actions to manipulate the application state.

  - the host can show the list of users by selecting them from the common store and dispatch an action `RemoveUser` to remove an user.

 

### Profile Module (mdmf-profile)

 

The profile project located in: `mdmf-profile` contains a profile module with some child routes configured. Any Angular module can be exposed for consumption by adding it into `exposes` of the `ModuleFederationPlugin` in the `webpack.config.js` file as below:

 

```js

plugins: [

  new ModuleFederationPlugin({

    name: "profile",

    library: { type: "var", name: "profile" },

    filename: "remoteEntry.js",

    exposes: {

      ProfileModule:

        "./projects/mdmf-profile/src/app/profile/profile.module.ts",

    },

    shared: {

        "@angular/core": { singleton: true, eager: false },

        "@angular/common": { singleton: true, eager: false },

        "@angular/router": { singleton: true, eager: false },

        "@ngxs/store": {singleton: true, eager: false },

        "mdmf-shared": { singleton: true, eager: false }

    },

  }),

]

```

 

- Shared application state:

  - the application state contains an array of users

  - both host and remote can dispatch actions to manipulate the application state.

  - the profile remote module can

    - add an user to the state by dispatch an action `AddUser`

    - can show the list of users by selecting them from the common store and dispatch an action `RemoveUser` to remove an user.

 

### Shared library (mdmf-shared-libs)

 

- the shared library is a typical Angular library created by `ng generate library mdmf-shared` as below

  ```bash

  ng new mdmf-shared-libs --create-application=false

  cd mdmf-shared-libs

  ng generate library mdmf-shared

  ```

 

- it uses state management library `ngxs`

  - the dependencies installation

    ```bash

    yarn add @ngxs/store

    ## for logging and browswer devtools

    yarn add --dev @ngxs/logger-plugin @ngxs/devtools-plugin

    ```

  - need to build the library first before running shell and profile projects

    ```bash

    yarn build

    ```

 

- it contains the `actions` (`AddUser`, `RemoveUser`), application `state` (`UserState`) and common `models` (`User`)

 

### React remote module

- the React Module Federation is created based on the [template](https://github.com/jherr/wp5-starter-react-ts) at `https://github.com/jherr/wp5-starter-react-ts`

 

- in order for the React component (`MyReactComponent`) to be consumed in Angular application,

  - it is wrapped as an Angular component (`MyWrapperReactComponent`).

  - it is then added to the `route` path of the routing module `MyWrapperReactRoutingModule`

  - an Angular modulue (`MyWrapperReactModule`) is created and exposed to ModuleFederation plugin (`webpack.config.js`) for consumption.

    ```js

    new ModuleFederationPlugin({

        name: 'mdmfreactts',

        library: { type: 'var', name: 'mdmfreactts' },

        filename: 'remoteEntry.js',

        remotes: {},

        exposes: {

            MyWrapperReactModule: './src/components/angular-wrapper/MyWrapperReactModule.tsx',

        },

        shared: {

            '@angular/core': { singleton: true, eager: true },

            '@angular/common': { singleton: true, eager: true },

            '@angular/router': { singleton: true, eager: true },

            '@ngxs/store': { singleton: true, eager: false },

            'mdmf-shared': { singleton: true, eager: false },

        },

    }),

    ```

 