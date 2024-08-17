app.up:
	docker-compose -f docker.compose.yml build && docker-compose -f docker.compose.yml up -d;

app.down:
	docker-compose -f docker.compose.yml down;