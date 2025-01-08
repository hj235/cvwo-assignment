package users

import (
	"fmt"
	"log"

	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
)

func List(db *database.Database) ([]models.User, error) {
	db, err := database.GetDB()
	if err != nil {
		fmt.Println("Failed to ping database.")
		log.Fatal(err)
	}

	query := "SELECT * FROM webforum.users"

	rows, err := db.Database.Query(query)
	var users []models.User

	for rows.Next() {
		user := models.User{}
		rows.Scan(&user.ID, &user.Name, &user.Date)
		users = append(users, user)
	}

	return users, nil
}
