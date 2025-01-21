package users

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/hj235/cvwo/internal/api"
	usersPkg "github.com/hj235/cvwo/internal/dataaccess/users"
	msgsPkg "github.com/hj235/cvwo/internal/handlers/messages"
	"github.com/hj235/cvwo/internal/handlers/utils"
	"github.com/hj235/cvwo/internal/models"
)

const (
	Delete = "delete.Delete"
)

func HandleDelete(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	var response = api.Response{}
	user := models.User{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrParseForm, Delete)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}
	defer r.Body.Close()

	err = usersPkg.Delete(&user)
	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrDeleteFailure, Delete)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}

	// data, err := json.Marshal(userSensitive)
	// if err != nil {
	// 	errorMessage := fmt.Sprintf(msgsPkg.ErrEncodeView, Delete)
	// 	return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	// }

	// response.Payload.Data = data
	response.Messages = append(response.Messages, msgsPkg.SuccessfulDeleteMessage)
	return &response, nil
}
