CHECK=\033[32m✔ Done\033[39m
HR=\033[37m--------------------------------------------------\033[39m

all: duplicate build

duplicate:
	@echo "\n${HR}"
	@printf "\033[36mCopying uncompressed file...\033[39m"
	@cp example/js/select-drop.js src/js/select-drop.js
	@echo "             ${CHECK}"

build:
	@printf "\033[36mMinifying source file...\033[39m"
	@uglifyjs src/js/select-drop.js -o src/js/select-drop.min.js
	@echo "                 ${CHECK}"
	@echo "${HR}\n"
