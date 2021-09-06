# HexBot API Test

This is just a test project that uses the HexBot API End-point.

This project uses Axios to connect to the API end-points and communicate using the client's browser.

## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the required dependencies.

```bash
npm install
```

## Usage
You can start the [lite-server web server](https://www.npmjs.com/package/lite-server) via:
```bash
npm run dev
```

## Configure

Inside the src folder, you will find a file named App.js if you edit this you can modify the end-points and other data such as the app name.

```javascript
App = {
  name: 'HexBot API Test', // This will change the header text and page title
  endpoint: 'https://hexbot.proj.vtc.gg/', // This will change where the page will load API requests
  ...
}
```

If you want to change the [lite-server configuration](https://www.npmjs.com/package/lite-server#custom-configuration) you can do so inside the bs-config.json file.

```json
{
  "server": {
    "baseDir": [
      "./src"
    ],
    "routes": {
      "/vendor": "./node_modules"
    }
  },
  "cors": true,
  "notify": false
}
```

## Contributing
Feel free to contribute and add to what we started, this is just a framework but we plan to add more API end-points which we made include in this project down the line.

Be aware that we may reject your contribution if we feel it doesn't meet the coding standards we are looking for, We may ask that you reinterpret your code or we may assist in making it fit for the project.

## License
[Creative Commons Attribution License](http://creativecommons.org/licenses/by/2.0/)
