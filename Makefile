serve:
	bundle exec jekyll serve

build:
	bundle exec jekyll build

deploy:
	git add .
	git commit -m update
	git push
