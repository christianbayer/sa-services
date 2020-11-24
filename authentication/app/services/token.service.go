package services

import (
	"authentication/app/helpers"
	"authentication/app/models"
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"strings"
	"time"
)

// The claims
type Claims struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	jwt.StandardClaims
}

func GenerateToken(user models.User) (int, string, int64) {

	// Get the secret key and ttl
	jwtKey := []byte(helpers.GetEnvString("JWT_KEY"))
	ttl := time.Duration(helpers.GetEnvInt("JWT_TTL")) * time.Minute

	// Declare the expiration time of the token
	expirationTime := time.Now().Add(ttl)

	// Create the JWT claims, which includes the user info and expiry time
	claims := &Claims{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Create the JWT string
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return http.StatusInternalServerError, "Internal server error", 0
	}

	return http.StatusOK, tokenString, int64(ttl) / int64(time.Second)
}

func RefreshToken(r *http.Request) (int, string, int64) {

	// Get the secret key and ttl
	jwtKey := []byte(helpers.GetEnvString("JWT_KEY"))
	ttl := time.Duration(helpers.GetEnvInt("JWT_TTL")) * time.Minute

	// Get the authorization header
	authorization := r.Header.Get("Authorization")

	// Check if the token is set
	if len(authorization) == 0 {
		return http.StatusUnauthorized, "", 0
	}

	// Remove "Bearer " from the string
	splitToken := strings.Split(authorization, "Bearer ")
	tokenString := splitToken[1]

	// Get the claims
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	// Check for errors
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return http.StatusUnauthorized, "", 0
		}
		return http.StatusBadRequest, "", 0
	}

	// Check if the token is valid
	if !token.Valid {
		return http.StatusUnauthorized, "", 0
	}

	// We ensure that a new token is not issued until enough time has elapsed
	// In this case, a new token will only be issued if the old token is within
	// 30 seconds of expiry. Otherwise, return a bad request status
	if time.Unix(claims.ExpiresAt, 0).Sub(time.Now()) > 30*time.Second {
		return http.StatusBadRequest, "", 0
	}

	// Now, create a new token for the current use, with a renewed expiration time
	expirationTime := time.Now().Add(ttl)
	claims.ExpiresAt = expirationTime.Unix()
	token = jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err = token.SignedString(jwtKey)
	if err != nil {
		return http.StatusInternalServerError, "", 0
	}

	return http.StatusOK, tokenString, int64(ttl) / int64(time.Second)
}
