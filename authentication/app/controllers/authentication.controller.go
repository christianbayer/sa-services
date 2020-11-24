package controllers

import (
	"authentication/app/models"
	"authentication/app/services"
	"encoding/json"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {

	// Set response type
	w.Header().Set("Content-Type", "application/json")

	type Response struct {
		Token string `json:"token"`
		Expires int64 `json:"expires"`
	}

	type ErrorResponse struct {
		Error string `json:"error"`
	}

	// Declare a new Person struct.
	var login models.Login

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := ErrorResponse{"Bad request"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Check if email and password are present
	if len(login.Email) == 0 || len(login.Password) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		response := ErrorResponse{"Bad request"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Call authentication
	status, message, user := services.Attempt(login)

	// Return error or unauthenticated
	if status != http.StatusOK {
		w.WriteHeader(status)
		response := ErrorResponse{message}
		json.NewEncoder(w).Encode(response)
		return
	}

	status, token, expirationTime := services.GenerateToken(user)
	if status != http.StatusOK {
		w.WriteHeader(status)
		response := ErrorResponse{token}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := Response{token, expirationTime}
	json.NewEncoder(w).Encode(response)
}
