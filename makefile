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
	cp manifest.json build/src
	cp -r images build/src
	cd build/src && zip -r -X ../build.zip .

test:
	$(call colorecho, "Run all Tests...")
	poetry run python -m unittest -v tests/*.py
	$(call colorecho, "Run flakehell lint...")
	poetry run flakehell lint
