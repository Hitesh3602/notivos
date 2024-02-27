
all: build

build:
	cd my-app && ng build -c production

run:
	cd my-app && ng serve -c development

start:
	cd my-app/dist/my-app && php -S 0.0.0.0:9000 -t .

www-browser:
	nohup chromium --remote-debugging-port=9222 --user-data-dir=/tmp/$(shell uuid) --url http://localhost:4200 >/dev/null 2>&1 &
