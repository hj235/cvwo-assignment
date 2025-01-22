package utils

import (
	"log"

	"github.com/hj235/cvwo/internal/database"
)

func UsernameExists(name string) bool {
	db := database.GetDB()

	query := "SELECT COUNT(*) FROM users WHERE `username`=? LIMIT 1"
	rows, err := db.Query(query, name)
	if err != nil {
		log.Println("Failed to query database", err)
	}

	var count int
	rows.Next()
	rows.Scan(&count)

	return count > 0
}

func IsValidUsername(username string) bool {
	return len(username) > 0
}

func IsValidPassword(password string) bool {
	return len(password) > 0
}

func IsValidTitle(title string) bool {
	return len(title) > 0
}
