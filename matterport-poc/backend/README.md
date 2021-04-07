# Installation with docker

Install dependencies so the IDE works fine:

`yarn`

If you are in a UNIX system use `make` to run the scripts, and if you are in windows install make (Ex. `choco install make`)

Commands:

`make dev-build` To delete orphan and old containers, build new containers, seed and watch the server
`make dev` To run / create containers and watch server
`make dev-clean` To nuke db and seed again (make sure containers are running)

And viola!

# backend

backend Server, based on Flugzeug.

## Development

Read the documentation at `docs/Framework.md`

```
npm run watch
```

## Prepare for production

```
npm run build
```

## Run in production

```
npm start
```

or

```
node dist/main.js
```

## Seed database (see app/seed.ts)

```
npm run seed
```

## Print database creation SQL (Useful when writing migrations)

```
npm run sql
```
