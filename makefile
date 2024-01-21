# Makefile

SHELL := /bin/bash

define colorecho
      @tput setaf 6
      @echo $1
      @tput sgr0
endef

.PHONY: run

package:
	$(call colorecho, "Packaging extension")
	rm -rf build
	mkdir -p build/src
	cp *.js build/src
	cp *.html build/src
	cp *.css build/src
	cp manifest.json build/src
	cp -r images build/src
	cd build/src && zip -r -X ../build.zip .

doc:
	$(call colorecho, "Starting Documentation locally...")
	cd docs && bundle exec just-the-docs rake search:init \
	cd docs && bundle exec jekyll serve --trace

doc-prod:
	JEKYLL_ENV=production && cd docs && bundle exec jekyll serve --trace

test:
	$(call colorecho, "Run all Tests...")
	poetry run python -m unittest -v tests/*.py
	$(call colorecho, "Run flakehell lint...")
	poetry run flakehell lint

access-token:
	curl "https://accounts.google.com/o/oauth2/token" -d \
	"client_id=$(CLIENT_ID)&client_secret=$(CLIENT_SECRET)&code=$(CODE)&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob"

token: dummy_dependency
    @response=$(curl -s -d "client_id=CLIENT_ID&client_secret=CLIENT_SECRET&grant_type=authorization_code&code=CODE&&redirect_uri=urn:ietf:wg:oauth:2.0:oob" \
      https://accounts.google.com/o/oauth2/token); \
    access_token=$(echo "$$response" | jq -r '.access_token'); \
    @echo "Access Token: $$access_token"

dummy_dependency:
	@echo "Checking if get_access_token needs to be updated"