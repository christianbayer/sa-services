package models

type User struct {
	ID        int    `json:"id,omitempty"`
	Birthdate string `json:"birthdate"`
	Identity  string `json:"identity"`
	Name      string `json:"name"`
	Email     string `json:"email"`
}
