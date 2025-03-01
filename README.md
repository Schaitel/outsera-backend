## Project setup

```bash
$ npm install

$ npx prisma generate
$ npm run prisma:seed
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

Para alterar o csv que é importado no banco de dados é só alterar a linha 20 do arquivo "ssed.ts", dentro da pasta prisma.
