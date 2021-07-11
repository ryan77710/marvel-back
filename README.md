# marvel-back

## User

### /user/signup (POST)

create a new user

| Body       | Type   | Required | Description   |
| ---------- | ------ | -------- | ------------- |
| `email`    | string | Yes      | user email    |
| `password` | string | Yes      | user password |
| `username` | string | Yes      | user username |
| `phone`    | string | Yes      | user phone    |
| `picture`  | files  | No       | user picture  |

<br>
<br>

### /user/login (POST)

log a user

| Body       | Type   | Required | Description   |
| ---------- | ------ | -------- | ------------- |
| `email`    | string | Yes      | user email    |
| `password` | string | Yes      | user password |

<br>
<br>

### /user-read/:token (GET)

get user data

| Body    | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| `token` | string | Yes      | user token  |

<br>
<br>

## Marvel Route

### /comics (GET)

get a array of comic

| Body    | Type   | Required | Description               |
| ------- | ------ | -------- | ------------------------- |
| `token` | string | No       | user token                |
| `title` | string | No       | comic title               |
| `limit` | number | Yes      | number of comics per page |
| `skip`  | number | Yes      | number of commic to skip  |

<br>
<br>

### /characters (GET)

get a array of character

| Body    | Type   | Required | Description               |
| ------- | ------ | -------- | ------------------------- |
| `token` | string | No       | user token                |
| `title` | string | No       | comic title               |
| `limit` | number | No       | number of comics per page |
| `skip`  | number | No       | number of commic to skip  |

<br>
<br>

### /character-comic/:id (GET)

get data of a character

| Body | Type   | Required | Description  |
| ---- | ------ | -------- | ------------ |
| `id` | string | Yes      | character id |

<br>
<br>

### /character-favored (GET)

add and delete favorite character

| Body          | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `token`       | string | Yes      | user token                  |
| `id`          | string | Yes      | id character                |
| `extension`   | string | Yes      | character picture extension |
| `description` | string | Yes      | character description       |
| `name`        | string | Yes      | character name              |
| `src`         | string | Yes      | character picture src       |

<br>
<br>

### /character-favored-delete (GET)

delete character favorite

| Body    | Type   | Required | Description    |
| ------- | ------ | -------- | -------------- |
| `token` | string | Yes      | user token     |
| `id`    | string | Yes      | id character   |
| `name`  | string | Yes      | character name |

### /comic-favored (POST)

add and delete favorite comic

| Body          | Type   | Required | Description             |
| ------------- | ------ | -------- | ----------------------- |
| `token`       | string | Yes      | user token              |
| `id`          | string | Yes      | id comic                |
| `extension`   | string | Yes      | comic picture extension |
| `description` | string | Yes      | comic description       |
| `name`        | string | Yes      | comic name              |
| `src`         | string | Yes      | comic picture src       |

<br>
<br>

### /comic-favored-delete (GET)

delete character favorite

| Body    | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| `token` | string | Yes      | user token  |
| `id`    | string | Yes      | id comic    |
| `name`  | string | Yes      | comic name  |
