[![Actions Status](https://github.com/Femalopper/frontend-project-11/workflows/hexlet-check/badge.svg)](https://github.com/Femalopper/frontend-project-11/actions)
[![Actions Status](https://github.com/Femalopper/frontend-project-11/workflows/eslint-check/badge.svg)](https://github.com/Femalopper/frontend-project-11/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/fa3ae0954da4e8146867/maintainability)](https://codeclimate.com/github/Femalopper/frontend-project-11/maintainability)

## Reference

https://frontend-project-11-jg05j2ip1-femalopper.vercel.app/

## Description

The implementation of RSS Reader. RSS - specialiazed format for newsline, articles and other materal description.
It is the simpliest way for sites to let users to sign up on updates. RSS readers can query website RSS feeds for new posts and display them in a convenient way, marking what they have read and so on.

RSS Reader is a service for RSS feeds aggregation, which let users to read various sources, such as blogs in a convenient way. It allows you to add an unlimited number of RSS feeds, updates them itself and adds new entries to the general feed.

### Animation

![Main functionality](https://github.com/Femalopper/raw/blob/main/images/rss-reader/rss.test.gif)

### Implemented features

:heavy_check_mark: Form (validation, error handling)

:heavy_check_mark: Posts (loading posts and updates every 5 seconds with the help of http requests)

:heavy_check_mark: Feeds

:heavy_check_mark: Preview (short post description)

### Setup

```sh

git clone git@github.com:Femalopper/frontend-project-11.git

cd frontend-project-11

make install

make develop

```
Open browser and enter - http://localhost:8080/.

### RSS feeds to test

- http://lenta.ru/l/r/EX/import.rss
- https://news.yandex.ru/daily.rss (invalid RSS)
- https://aljazeera.com/xml/rss/all.xml
- https://ru.hexlet.io/lessons.rss





