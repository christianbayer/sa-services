package main

import (
	"github.com/joho/godotenv"
	"log"
)

func setupEnv() {
	// Load the .env file in the current directory
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading environment file")
	}
}
