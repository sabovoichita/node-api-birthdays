# node-api

Node JS CRUD API Example

- [x] store info in [JSON file](data/birthdays.json)
- [x] store info in DB [MySQL](https://www.mysql.com/)
- [ ] store info in file similar to mongo format (check https://github.com/sergeyksv/tingodb)
- [x] UI Example for this app can be found in [nmatei/birthdays-calendar](https://github.com/nmatei/birthdays-calendar)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
- [JSON file as storage](#json-file-as-storage)
- [DB (MySQL) as storage](#db-mysql-as-storage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ⚙ Install

```sh
git clone https://github.com/nmatei/node-api.git
cd node-api
npm install
```

## Usage

```sh
npm start
# or (when you work inside code and want auto restart)
npm run devstart
```

Open http://localhost:3000 to see if it works

## JSON file as storage

Team members are stored inside [data/birthdays.json](data/birthdays.json)

```js
// GET birthdays-json
fetch("http://localhost:3000/birthdays-json", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});

// POST birthdays-json/create
fetch("http://localhost:3000/birthdays-json/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    promotion: "WON3",
    members: "Your Name",
    name: "CV",
    url: "https://github.com/nmatei/birthdays-calendar"
  })
});

// DELETE birthdays-json/delete
fetch("http://localhost:3000/birthdays-json/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ id: "fedcba1610309909431" })
});

// PUT birthdays-json/update
fetch("http://localhost:3000/birthdays-json/update", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    id: "fedcba1610310163146",
    promotion: "WON3",
    members: "UpdatedName",
    name: "Name",
    url: "https://github.com/nmatei/birthdays-calendar"
  })
});
```

## DB (MySQL) as storage

Team members are stored in [MySQL](https://www.mysql.com/)

- configure user & pass for mysql connection [routes/birthdays-db.js](routes/birthdays-db.js)
- create a database named **birthdays**
- run [http://localhost:3000/birthdays/install](http://localhost:3000/birthdays/install)
- now you can run all CRUD operations
  - the same as for json but change url **"birthdays-json" -> "birthdays"**

## TODOs

in case port us used...

- give hints...
- and change port if not possible.

add port config
