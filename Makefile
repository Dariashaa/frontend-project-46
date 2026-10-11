install: deps-install
	npx simple-git-hooks

deps-install:
	npm ci

lint:
	npx oxlint && npx oxfmt --check

lint-fix:
	npx oxfmt && npx oxlint --fix

test-coverage:
	npm test-coverage