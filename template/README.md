# {{ app_name }}

> {{ description }}

## Test Login Data:
```
{
    "email": "peter@klaven",
    "password": "cityslicka"
}
```

## Installation & Set Up

``` bash
# Make sure you are using Node >=v8.x (`node -v`)

# Install Vue CLI 
npm install -g vue-cli

# Install NativeScript CLI
npm install nativescript@next -g

# To see if it worked and your system meets requirements
tns doctor

## 'tns doctor' gives you an output with possible issues (e.g Android SDK not installed)
```

## Usage

``` bash
# Install dependencies
npm install

# Build for production
npm run build
npm run build:ios
npm run build:android
-- Add :dev or :prod to the end of each command to change environment to development or production. Otherwise local environment will be used
e.g: npm run build:ios:prod

# Build, watch for changes and debug the application
npm run debug
npm run debug:ios
npm run debug:android
-- Add :dev or :prod to the end of each command to change environment to development or production. Otherwise local environment will be used
e.g: npm run debug:android:dev

# Build, watch for changes and run the application
npm run watch
npm run watch:ios
npm run watch:android
-- Add :dev or :prod to the end of each command to change environment to development or production. Otherwise local environment will be used
e.g: npm run watch:ios:dev

# Clean the NativeScript application instance (i.e. rm -rf dist)
npm run clean
```

## Linting
``` bash
# To use the linter and check coding standards run
npm run lint
```

## Environment Variables
Variables dependent of the environment can be set at `./src/config`.

If you want to add a new variable please add it also to webpack.config.js:
```
new webpack.DefinePlugin({
  YOUR_VARIABLE: JSON.stringify(configData.YOUR_VARIABLE),
}),
```
Afterwards use it as a global!

Make sure to add them also to `eslintrc.json`:
```
"globals": {
  "YOUR_VARIABLE": false
}
```

> When invoking the various npm scripts, omitting the platform will attempt to launch `tns` for both platforms, which will only work in a properly configured OSX environment.

For detailed instructions, see https://github.com/nativescript-vue/vue-cli-template