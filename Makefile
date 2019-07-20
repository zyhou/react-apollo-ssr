help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install dep
	yarn

start-server: ## Start server on 3000
	yarn start:server

start-client: ## Start client on 8080
	yarn start:client

clean: ## Clean dist directory
	rm -rf dist/
