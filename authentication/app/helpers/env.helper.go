package helpers

import (
	"log"
	"os"
	"strconv"
)

func GetEnv(key string) string {
	env := os.Getenv(key)
	if env == "" {
		log.Fatalf("Environment variable %s not set", key)
	}
	return env
}

func GetEnvString(key string) string {
	return GetEnv(key)
}

func GetEnvInt(key string) int {
	env, err := strconv.Atoi(GetEnv(key))
	if err != nil {
		return 0
	}
	return env
}

func GetEnvBool(key string) bool {
	env, err := strconv.ParseBool(GetEnv(key))
	if err != nil {
		return false
	}
	return env
}
