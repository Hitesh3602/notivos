
.PHONY: copy-all copy-note-server copy-note-angular
all:

copy-all:
	make copy-note-server && make copy-note-angular

copy-note-server:
	rsync -a sources/backend/java/target/notes-0.0.1-SNAPSHOT.jar root@playbox:/root/java-note-docker/note-server

copy-note-angular:
	tar zcf $(PWD)/docker/note-angular/app.tgz -C $(PWD)/sources/frontend/my-app/dist/my-app .
	rsync -a docker/note-angular/app.tgz root@playbox:/root/java-note-docker/note-angular
