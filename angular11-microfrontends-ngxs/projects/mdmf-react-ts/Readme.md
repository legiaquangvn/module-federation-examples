# Module Federation with remote React and Angular host

This is the remote React project and it is used with Angular host project of Module Federation.

In order to embed the React component in Angular app, the React component will 
 - have to be wrapped, and exposed as an Angular component, 
 - put it into a Angular module with Angular routing module

The Angular wrapped module will be exposed in the `ModuleFederationPlugin` configuration of the  `webpack.config.js` file as 
```js
      exposes: {
        MyWrapperReactModule: "./src/components/angular-wrapper/MyWrapperReactModule.tsx",
      }
```

