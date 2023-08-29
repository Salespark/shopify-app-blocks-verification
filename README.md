<h1 align="center">
  <br>
  Shopify App Block Verification
  <br>
</h1>


## Installation
Install dependencies
```bash
$ npm install
```

## Local development environment
Start the server
```bash
npm run dev
```

## Production environment
Build the project
```bash
npm run build
```
Start the server
```bash
npm run start
```
Start the server with PM2
```bash
npm run pm2
```
Start the project with docker
```bash
npm run docker
```

## Docker
Create Symlink
```bash
$ ln -s ./environment/.env ./.env
```
Run following command with env file to build and up docker
```bash
$ docker compose --env-file ./environment/.env -f docker-compose.yml up -d
```
Command without env file
```bash
$ docker compose -f docker-compose.yml up -d
```
Run through npm
```bash
$ npm run docker
```
Run mongodb container
```bash
$ docker compose -f docker-compose.mongodb.yml up
```
Ubuntu volume has permissions issue(Map container db to the hosted machine)
```bash
$ chmod -R 777 path/to/the/hosted/dir
```

## Useful Scripts
Format code
```bash
$ npm run format
```
Jsdocs
```bash
$ npm run docs
```
Run Https tunnel through ngrok
```bash
$ npm run ngrok
```
Run Https tunnel through  LocalTunnel
```bash
$ npm run localtunnel
```

## Docker
Login into container shell
```bash
$ docker exec -it <container-name> /bin/sh
```
## Testing
Webhooks local Testing [Webhook Trigger](https://shopify.dev/docs/apps/tools/cli/commands#webhook-trigger) and Topic List `APP_UNINSTALLED` `APP_SUBSCRIPTIONS_UPDATE`
```bash
$ npm run webhooks --topic=APP_UNINSTALLED --route=webhook/uninstall
```

## Authors

- [@alpharages](https://github.com/alpharagesadmin)

---

> [alpharages.com](https://alpharages.com/) &nbsp;&middot;&nbsp;
> GitHub [@alpharages](https://github.com/alpharagesadmin) &nbsp;&middot;&nbsp;
> Linkedin [@alpharages](https://www.linkedin.com/company/alpharages) &nbsp;&middot;&nbsp;
> Youtube [@alpharageslifestyle](https://www.youtube.com/channel/UCrkH0PJFi2AnFQIKFlRr6zw)
