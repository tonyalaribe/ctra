package config

import (
	"log"
	"os"
	"path/filepath"

	"github.com/asdine/storm"
	"github.com/blevesearch/bleve"
	"github.com/dgraph-io/badger"
)

//Conf nbfmjh
type Conf struct {
	// DgraphClient *client.Dgraph
	// Nats stan.Conn

	// BoltFile string
	// BoltDB   *bolt.DB

	Storm        *storm.DB
	BadgerDB     map[string]*badger.DB
	BleveIndexes map[string]bleve.Index

	BleveFile  string
	BleveIndex bleve.Index
}

var (
	config Conf
)

const (
	ADVERT   = "advert"
	LISTING  = "listing"
	FACEBOOK = "facebook"
)

func Init() {

	var err error
	config = Conf{}

	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		log.Println("db path not set, resulting to default address")
		dbPath = "database"
	}

	err = os.MkdirAll(dbPath, os.ModeDir)
	if err != nil {
		log.Println(err)
	}

	db, err := storm.Open(filepath.Join(dbPath, "ctra.bolt"))
	if err != nil {
		log.Println(err)
	}
	config.Storm = db

	// err = BleveInit(&config, dbPath)
	// if err != nil {
	// 	log.Println(err)
	// }

}

func Get() *Conf {
	return &config
}
