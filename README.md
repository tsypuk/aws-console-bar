# Increase your productivity in AWS Console with ``aws-console-bar`` Chrome Extension

---
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
![Docs](https://github.com/tsypuk/aws-console-bar/actions/workflows/pages.yml/badge.svg?event=push)
![Jest Tests](https://github.com/tsypuk/aws-console-bar/actions/workflows/jest.yml/badge.svg?event=push)

## Screens of extension

![account_registration.png](docs/docs/images/screens/account_registration.png)

![accounts_history.png](docs/docs/images/screens/accounts_history.png)

![aws_news.png](docs/docs/images/screens/aws_news.png)

## Publishing
https://developer.chrome.com/docs/webstore/using_webstore_api/

https://chrome.google.com/webstore/devconsole/


## TODO:

- add average session line: https://echarts.apache.org/examples/en/editor.html?c=multiple-y-axis
- add filter on session history by accountID
- add filter on session history by Date Between
- add filter on session history by user
- add filter on session history by type
- migrate from JS to ECMA script 6
- cover with more tests
- migrate build system webpack assembly
- update online documentation
- detect non-home region feature
- add pagination to session history
- update popup with more styles
- import accounts into extension from JSON
- random color for new account created (if non was defined)