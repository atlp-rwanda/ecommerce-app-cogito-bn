build:
	docker-compose up -d --build --remove-orphans
up:
	docker-compose up -d
down:
	docker-compose down
down-v:
	docker-compose down -v
logs:
	docker-compose logs
api-logs:
	docker logs e_commerce-node-app-1
db-logs:
	docker logs e_commerce-postgres-1
migrate:
	docker exec e_commerce-node-app-1 npm run migrate
migrate-rollback:
	docker exec e_commerce-node-app-1 npm run down
seed:
	docker exec e_commerce-node-app-1 npm run seed
seed-rollback:
	docker exec e_commerce-node-app-1 nom run seed-down