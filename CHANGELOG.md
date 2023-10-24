# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.6.0](https://github.com/tsypuk/aws-console-bar/compare/v1.5.0...v1.6.0) (2023-10-24)


### Features

* add session tracking interval ([f4473a2](https://github.com/tsypuk/aws-console-bar/commit/f4473a22f283d66fa58a1384aec4df4e09533a06))
* add settings page into extension, save 2 time configurations into chrome storage ([323580d](https://github.com/tsypuk/aws-console-bar/commit/323580db1d5cbc6929d9706bfbffcec75ff72005))
* aws console shows random news from selected aws-news feed channels; news are clickable and open in new tab ([ce996e7](https://github.com/tsypuk/aws-console-bar/commit/ce996e7c86eaea33d42b7b54a21f66707cbea700))
* fetch aws feed news for category when slide bar on news page is moved ([2ba3447](https://github.com/tsypuk/aws-console-bar/commit/2ba34478b6b82df1be99956a1a73552ad1d386d8))
* maintain feed [] as index for lookups on category change ([ac19d73](https://github.com/tsypuk/aws-console-bar/commit/ac19d73e4a59a95ba74b486cf6d0dff33fb15028))
* read random news from random category that is allowed ([ca9201d](https://github.com/tsypuk/aws-console-bar/commit/ca9201ddc954e0263df511faa88de28272f62104))

## [1.5.0](https://github.com/tsypuk/aws-console-bar/compare/v1.4.0...v1.5.0) (2023-10-22)


### Features

* add css for links container ([7927b88](https://github.com/tsypuk/aws-console-bar/commit/7927b881ad07a4f4daefb5a9f668f9cb13397471))
* add design for main page elements ([2da62ed](https://github.com/tsypuk/aws-console-bar/commit/2da62ed00697e2896af79b7928765844760c673f))
* add handler for each news type checkbox ([54f0fb0](https://github.com/tsypuk/aws-console-bar/commit/54f0fb088bbfa43f87be7f987dade85a569ca140))
* add history page to track aws account switching and time of session in it ([31d790c](https://github.com/tsypuk/aws-console-bar/commit/31d790c6244abe492713e0bfbb89c2ad78c4d9d4))
* add Index of aws news li element to news configuration page ([04d73e4](https://github.com/tsypuk/aws-console-bar/commit/04d73e4f32601758fa7fcf31b1f359d8c0eedc61))
* add more elements; change styling for menu ([de5858c](https://github.com/tsypuk/aws-console-bar/commit/de5858c497d81f6a53b1474610cfb365454a6182))
* add select and persist user choice for each aws news feed category ([cacb0d8](https://github.com/tsypuk/aws-console-bar/commit/cacb0d8878546350e9f624892c41628ca36fe9a1))
* add toggle to select aws news index in table ([f646434](https://github.com/tsypuk/aws-console-bar/commit/f6464341b74cf6eae422b99f65072ad47ba00528))
* added bootstrap design ([7866a97](https://github.com/tsypuk/aws-console-bar/commit/7866a97c9187474d7ce63da4ce3ec9044fe3b8ef))
* change row color if toggle is on/off ([3cf7320](https://github.com/tsypuk/aws-console-bar/commit/3cf7320fea6865b9db1719dffdde97f2fab47fa9))
* create menu; add navigation dynamic adding elements to menu based on select from index ([93fe7ed](https://github.com/tsypuk/aws-console-bar/commit/93fe7ed384e1bfb5e73db32f4791770e793e6d90))
* extract aws news from option page; create injectable menu ([0d32aa8](https://github.com/tsypuk/aws-console-bar/commit/0d32aa867123c6e080e898b3abc48f1756d2ae08))
* fetch aws news index ([9bdbadf](https://github.com/tsypuk/aws-console-bar/commit/9bdbadf461ee274b008ab078356d557378d98be7))
* history page table add styling ([f81c0b1](https://github.com/tsypuk/aws-console-bar/commit/f81c0b156f1a4cf8bb33049044b4f09ffa7d7236))
* implement single page navigation on aws news page both for index and all sections ([1dfb791](https://github.com/tsypuk/aws-console-bar/commit/1dfb79132d3fe66c3c9c256b49563affc6cac909))
* redesign main menu ([afa9b64](https://github.com/tsypuk/aws-console-bar/commit/afa9b64d4cb9dd674cc23f36f9d19ce4330169b4))
* render aws news index catalog; save to local storage ([2e96454](https://github.com/tsypuk/aws-console-bar/commit/2e96454aecdc30cfb6a27b0af8efef5268b787b8))


### Bug Fixes

* remove bundle script not available for cors policy ([60efeb4](https://github.com/tsypuk/aws-console-bar/commit/60efeb408841f87b027d33c2e33c3938b7bc732a))

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
