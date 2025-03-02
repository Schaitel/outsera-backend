## Requisitos

- Node.js (version 22)
- npm

## Project setup

```bash
$ npm install

$ npx prisma db push

$ npx prisma generate

$ npm run prisma:seed

$ npm run build
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# e2e tests
$ npm run test:e2e
```

Para alterar o csv que é importado no banco de dados é só alterar a linha 17 do arquivo "seed.ts", dentro da pasta prisma.
