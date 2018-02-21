//go:generate statik -src=./public
package main

import (
	"flag"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
	// _ "github.com/tonyalaribe/sett/statik"

	"github.com/go-chi/cors"
	"github.com/tonyalaribe/ctra/config"
	"github.com/tonyalaribe/ctra/item"
)

// Router struct would carry the httprouter instance, so its methods could be verwritten and replaced with methds with wraphandler
func init() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
}

func Routes() *chi.Mux {
	router := chi.NewRouter()
	router.Use(
		render.SetContentType(render.ContentTypeJSON),
		middleware.Logger,
		middleware.RequestID,
		middleware.URLFormat,
		middleware.DefaultCompress,
		// middleware.RedirectSlashes,
		middleware.Recoverer,
	)
	chi_cors := cors.New(cors.Options{
		//		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "DELETE"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Accept", "Content-Type", "X-Auth-Token", "*"},
		Debug:            false,
	})
	router.Use(chi_cors.Handler)

	// statikFS, err := fs.New()
	// if err != nil {
	// 	log.Println(err)
	// }

	router.Mount("/api/items", item.Routes())

	router.Get("/*", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/index.html")
	})
	router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/index.html")
	})

	router.NotFound(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/index.html")
	})

	fileServer := http.StripPrefix("/assets/", http.FileServer(http.Dir("./public/assets")))
	router.Get("/assets/*", func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.URL.String())
		w.Header().Set("Vary", "Accept-Encoding")
		w.Header().Set("Cache-Control", "public, max-age=7776000")
		fileServer.ServeHTTP(w, r)
	})
	return router
}

func main() {
	flag.Parse()
	config.Init()

	router := Routes()

	// walkFunc := func(method string, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
	// 	log.Printf("%s %s\n", method, route)
	// 	return nil
	// }
	//
	// if err := chi.Walk(router, walkFunc); err != nil {
	// 	log.Printf("Logging err: %s\n", err.Error())
	// }

	PORT := os.Getenv("PORT")
	if PORT == "" {
		log.Println("No Global port has been defined, using default")
		PORT = "8080"
	}

	log.Println("serving at :" + PORT)
	log.Fatal(http.ListenAndServe(":"+PORT, router))
}
