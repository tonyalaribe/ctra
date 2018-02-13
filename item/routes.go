package item

import "github.com/go-chi/chi"

func Routes() chi.Router {
	router := chi.NewRouter()
	router.Post("/create", Create)
	router.Get("/all", GetAll)
	router.Get("/search/{q}", Search)
	router.Get("/{id}", GetOne)

	return router
}
