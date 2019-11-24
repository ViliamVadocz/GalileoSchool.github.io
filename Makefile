# this allows us to run commands on most systems using the tool 'make'.
# for example, to transpile the code into the build directory, one can run:
#  make build

dependencycheck:
	# Check tools ****************************************************************
	git --version
	node --version
	npm --version

firsttimesetup:
	# Downloading node modules ***************************************************
	npm install

clean:
	# clean the directory from all annoying OS X .DS_Store files
	find . -name '*.DS_Store' -type f -delete

build:
	# Building in build/ *********************************************************
	rm -rf build
	node build
	# The End *******************************************************************

.PHONY: dependencycheck clean firsttimesetup build
