build-app:
	docker-compose -f docker-compose.yml build

launch-app: build-app
	docker-compose -f docker-compose.yml up

connect-db:
	docker exec -it menumystery-postgres-1 psql -U admin -d admin_db