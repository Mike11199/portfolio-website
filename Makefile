# Frontend development commands. Run from the repository root.
# Requires GNU Make and a Node.js version supported by frontend's Vite, with npm.
#
# Install GNU Make:
#   Windows (PowerShell): winget install --id GnuWin32.Make --exact --source winget
#     Add C:\Program Files (x86)\GnuWin32\bin to your user PATH, then reopen your terminal.
#     For the current Git Bash session: export PATH="$PATH:/c/Program Files (x86)/GnuWin32/bin"
#   Ubuntu / Debian: sudo apt update && sudo apt install make
#   Fedora: sudo dnf install make
#   Arch Linux: sudo pacman -S make
#
# Run `make` or `make help` to list commands; start with `make install` and `make dev`.
# Infrastructure and deployment are managed exclusively through GitHub Actions CI/CD.
# This Makefile intentionally provides no CDK or deployment targets.

.DEFAULT_GOAL := help

.PHONY: help install dev build lint audit preview

help:
	@echo "Frontend commands"
	@echo ""
	@echo "  make install   Install dependencies from the lockfile"
	@echo "  make dev       Start the development server"
	@echo "  make build     Type-check and build for production"
	@echo "  make lint      Run ESLint"
	@echo "  make audit     Check dependencies for known vulnerabilities"
	@echo "  make preview   Preview the production build locally"
	@echo "  make help      Show this help"
	@echo ""
	@echo "  Quick start: make install, then make dev"
	@echo "  Preview:     make build, then make preview"

install:
	npm --prefix frontend ci

dev:
	npm --prefix frontend run dev

build:
	npm --prefix frontend run build

lint:
	npm --prefix frontend run lint

audit:
	npm --prefix frontend audit

preview:
	npm --prefix frontend run preview
