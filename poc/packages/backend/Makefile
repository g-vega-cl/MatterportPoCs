# MAKE SURE THIS FILES USE TABS AND NO SPACES

# Delete everything, Build everything, Seed and Watch
dev-build:
		@docker-compose down && \
				docker-compose build --pull --no-cache && \
				docker-compose \
						-f docker-compose.yml \
						-f docker-compose.local.yml \
						-f docker-compose.local-seed.yml \
				up --remove-orphans

# Runs / Buils without seeding
dev:
		@docker-compose \
				-f docker-compose.yml \
				-f docker-compose.local.yml \
				-f docker-compose.local-run.yml \
		up

# clean db and seed again (make sure it container is running)
dev-clean: _dev_mysql_clear _dev_seed

# Run seed in API (make sure it container is running)
_dev_seed:
		@docker exec -i ks-matter-poc-api bash -c "npm install && npm run sql && npm run seed"

# DROP table in DB (make sure it container is running)
_dev_mysql_clear:
	  @docker exec -i ks-matter-poc-database mysql -uroot -proot  <<< "DROP DATABASE backend;CREATE DATABASE backend;"




