# ilert-js CHANGELOG

## 2024-01-08, Version 4.0.0

* **BREAKING** adjusted API to versionless /api/x api calls
* **BREAKING** transition incident to alert to make room for the new "incident" object see https://docs.ilert.com/rest-api/api-version-history#dropping-url-versions-globally for more information (basically old incident is now alert and new incident is now incident)
* **BREAKING** removed uptime monitor resource
* updated dependencies
* auto adding bearer prefix

## 2020-06-09, Version 3.1.0

* added heartbeat endpoint

## 2020-05-22, Version 3.0.1

* added missing typescript definitions

## 2020-05-22, Version 3.0.0

* **BREAKING** adapted to a better single item api structure
* added more api endpoints (incidents)

## 2020-05-13, Version 2.0.0

* **BREAKING** switched to a simpler api structure
* added uptime monitor api

## 2020-05-13, Version 1.0.0

* providing initial package