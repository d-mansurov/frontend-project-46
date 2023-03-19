install: 
	npm ci
publish: 
	npm publish --dry-run
lint: 
	npx eslint .
gendiff:
	node bin/gendiff.js
jest:
	NODE_OPTIONS=--experimental-vm-modules npx jest
jest-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage