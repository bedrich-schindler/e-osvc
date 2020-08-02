# e-OSVČ

Application for management of self-employeed people.

## Initial setup

1. Install local npm packages: `npm install`
2. Update config `config/config.js`

## Build
 
1. Run `npm run build` to build Web project
2. Run `npm run build-and-pack-electron` to build Electron project and pack it

If you want to publish new version to GitHub, run `GH_TOKEN=<token> npm run build-pack-and-release-electron` where token is Personal Access Token.

## Development

### Web

1. Run `npm start`

### Electron

1. Run `npm run build-electron` to build Electron
1. Run `npm run start-electron` to start Electron

## Testing

1. Run `npm test` to test application
