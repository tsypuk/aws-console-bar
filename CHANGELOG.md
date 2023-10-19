# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](https://github.com/tsypuk/aws-console-bar/compare/v1.3.0...v1.4.0) (2023-10-19)


### Features

* add support for federated user in aws console ([3dbc404](https://github.com/tsypuk/aws-console-bar/commit/3dbc4045642d6f86a4b6c6b77f35ee37bd31ce08))
* change colors if unknown account ([510fe70](https://github.com/tsypuk/aws-console-bar/commit/510fe70d52f6853fd891ef1574c220d13540d445))
* change registration button style based on account ([87429ef](https://github.com/tsypuk/aws-console-bar/commit/87429ef84e5d0494aca5010f8d8bc73412ea7853))
* export aws accounts configuration as downloadable json configuration file ([87ff821](https://github.com/tsypuk/aws-console-bar/commit/87ff821f0d83e648026539835aa9960eaae4ab54))
* hide/show export button depending on the storage of aws accounts ([ac01934](https://github.com/tsypuk/aws-console-bar/commit/ac019344e3a194f517cd7c5f187e1ad80eef33a0))

## [1.3.0](https://github.com/tsypuk/aws-console-bar/compare/v1.2.1...v1.3.0) (2023-10-18)


### Features

* add history tracking for account ([593a09d](https://github.com/tsypuk/aws-console-bar/commit/593a09d9a79dea1838cff0c2bb8ec62572aec4b2))
* add reaction on active/inactive account ([3def040](https://github.com/tsypuk/aws-console-bar/commit/3def040428b3cc0fd653f139e1fbff1522cccf4b))
* aws news rendered on console bar ([76cd35b](https://github.com/tsypuk/aws-console-bar/commit/76cd35b9208efe6e5428dc1a6c7da9d5c84b126e))
* get AWS news, persist them and show random new in the toolbar ([f1b253d](https://github.com/tsypuk/aws-console-bar/commit/f1b253db89a53157de1a0f8cf76b5bd64c0a1a51))
* render aws news in extension option page ([b8033dd](https://github.com/tsypuk/aws-console-bar/commit/b8033dd93c92b5a24873d408c92c6cf33d371408))

### [1.2.1](https://github.com/tsypuk/aws-console-bar/compare/v1.2.0...v1.2.1) (2023-10-14)

## [1.2.0](https://github.com/tsypuk/aws-console-bar/compare/v1.1.0...v1.2.0) (2023-10-14)


### Features

* add accounts counter to popup page ([a4e17a6](https://github.com/tsypuk/aws-console-bar/commit/a4e17a68c3d21463e7409afe3bb92e4031689d78))
* add support for both assumed role and iam user ([3fb726d](https://github.com/tsypuk/aws-console-bar/commit/3fb726dcd41efb48f9592ed476546da5a974aa7c))
* add timer for current session with notification ([c7bb46e](https://github.com/tsypuk/aws-console-bar/commit/c7bb46ea0ae86d1f99beb5ee3acd7ce0d3a52491))
* addd publishing to chrome store ([25b93cc](https://github.com/tsypuk/aws-console-bar/commit/25b93cc54fe6e918420f42a7ad93104ba8287625))
* check if active aws console session is running otherwise stop timer ([ffa1c58](https://github.com/tsypuk/aws-console-bar/commit/ffa1c58d9a48405b0f446c0eb31251b1236e9fe6))
* extract option styles to css file; add storage initialization ([5faa85c](https://github.com/tsypuk/aws-console-bar/commit/5faa85c7400a66ba0b34ba71347acab0ccceb370))
* extract popup styles to css file ([df83d2e](https://github.com/tsypuk/aws-console-bar/commit/df83d2eba48da43033f00f9b39a6a1299aa66f36))
* read federated account identifiers ([ae785af](https://github.com/tsypuk/aws-console-bar/commit/ae785afd2f9dc4eeb6b8870f6c5d84cf1dd527a0))


### Bug Fixes

* **accounts:** add first initialization empty accounts case handler ([de5ede6](https://github.com/tsypuk/aws-console-bar/commit/de5ede6a8832a4fb2299164dc9ff00bb4ed3c5c0))

## 1.1.0 (2023-09-02)


### Features

* accounts are saved/loaded from extension storage ([980c7c3](https://github.com/tsypuk/aws-console-extension/commit/980c7c39236c00651bbadf2d1c736935a818994e))
* added background worker; registering account in option ([082630a](https://github.com/tsypuk/aws-console-extension/commit/082630aa19de5c64c1ba07f2fb2aed1757f8918f))
* added clickable links in popup ([c14b8f4](https://github.com/tsypuk/aws-console-extension/commit/c14b8f49095a1422a3e64047ff4e1fee0539fbb9))
* aws accounts operatable ([97ba41e](https://github.com/tsypuk/aws-console-extension/commit/97ba41e5bd326da99d32760b4187e3079b0f4059))
* delete account in extension configuration ([47fdbcf](https://github.com/tsypuk/aws-console-extension/commit/47fdbcf9fd38be9445311ae4fb5e667b0e5be429))
* editing of aws accounts list with updates to name ([3ff2bd5](https://github.com/tsypuk/aws-console-extension/commit/3ff2bd52d343274914a6196152d7a77159f2c8a8))
* extension icon changes to alarm if aws account is not known and back to default through background worker ([20b4beb](https://github.com/tsypuk/aws-console-extension/commit/20b4bebbe8218ffe4911bf0d9390bfb9efbc42db))
* extension is loading in chrome ([d6b06a3](https://github.com/tsypuk/aws-console-extension/commit/d6b06a35a4c073ae81876523f2b3162037c904c1))
* lookup into created accounts to get alias; added div with styles for rendering ([42ede46](https://github.com/tsypuk/aws-console-extension/commit/42ede4612d0523b01f4b4d114023e3d7a9bf0a58))
* periodical polling of region and accountID ([8d0653a](https://github.com/tsypuk/aws-console-extension/commit/8d0653a5957ff7116677fc0009ad36fb726c04ed))
* read aws accountID and aws region from console ([7c8f9cf](https://github.com/tsypuk/aws-console-extension/commit/7c8f9cf27a9c0b27af217bbf7e1515d224782e8f))
* removed state from content to chrome storage ([3765543](https://github.com/tsypuk/aws-console-extension/commit/37655439249b3a81c45986cacf80c86d2d188545))
* removed state from options to chrome storage ([8d529f7](https://github.com/tsypuk/aws-console-extension/commit/8d529f7061e3c3207dcf585d8d81a3f67d6aba97))
* update message only if account has changed ([d187218](https://github.com/tsypuk/aws-console-extension/commit/d1872187cc756ce78ee8e1fc454eddce9077ffe4))
