package services

import (
	"authentication/app/models"
	"authentication/app/helpers"
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

func Attempt(login models.Login) (int, string, models.User) {

	var api = helpers.GetEnvString("API_GATEWAY")

	// Create json
	jsonReq, err := json.Marshal(login)

	// Do the request
	resp, err := http.Post(api + "/attempt", "application/json; charset=utf-8", bytes.NewBuffer(jsonReq))
	if err != nil {
		log.Fatalln(err)
	}

	// Invalid credentials
	if resp.StatusCode == http.StatusUnauthorized {
		return http.StatusUnauthorized, "Unauthorized.", models.User{}
	}

	// Unknown error
	if resp.StatusCode != http.StatusOK {
		return http.StatusInternalServerError, "Internal server error", models.User{}
	}

	// Get the response body
	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	// Convert response body to string
	bodyString := string(bodyBytes)

	// Get raw message
	var result map[string]json.RawMessage
	json.Unmarshal([]byte(bodyString), &result)

	// Convert response body to User
	var user models.User
	json.Unmarshal(result["user"], &user)

	return 200, "Success", user
}
