
REPORTER = dot

all: build build-dev

build:
	@mkdir -p dist
	@./node_modules/.bin/browserbuild \
		-g Urlify \
		-m urlify -b lib/ \
		lib > dist/urlify.js

build-dev:
	@mkdir -p dist
	@./node_modules/.bin/browserbuild \
		-g Urlify \
		-d -m urlify -b lib/ \
		lib > dist/urlify-dev.js

test:
	@./node_modules/.bin/mocha \
		--require ./test/common \
		--reporter $(REPORTER) \
		$(TESTS)

test-browser: build-dev
	@mkdir -p test/dist
	@cp dist/* test/dist
	@echo visit file://$(PWD)/test/index.html

clean:
	@rm -r dist/* test/dist

.PHONY: test test-browser clean
