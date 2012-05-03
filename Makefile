
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

test-browser:
	@./node_modules/.bin/serve test/

clean:
	@rm -r dist

.PHONY: test test-browser clean
