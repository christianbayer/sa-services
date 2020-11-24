package main

import (
	"authentication/app/controllers"
	"authentication/app/helpers"
	"fmt"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func main() {

	// Setup environment
	setupEnv()

	// Routing
	r := mux.NewRouter()
	r.HandleFunc("/login", controllers.Login).Methods(http.MethodPost)

	http.Handle("/", r)

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"})

	// Start the server on port 8001
	port := helpers.GetEnvString("APP_PORT")
	fmt.Printf("Server started at localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, handlers.CORS(originsOk, headersOk, methodsOk)(r)))
}
