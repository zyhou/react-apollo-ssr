help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install dep
	yarn

start: ## Start server on 3000
	yarn start

build: ## Build in dist directory
	yarn build:server
	yarn build:client

build-bundle-stats:
	yarn rimraf ./stats.json
	yarn build:stats

build-analyse-visualization: build-bundle-stats ## Launch bundle analyser in production mode
	yarn webpack-bundle-analyzer stats.json ./dist

server-start-production: ## Start server in production mode
	yarn cross-env NODE_ENV=production node dist/server/index.js

clear: ## Clean dist directory
	yarn rimraf dist
