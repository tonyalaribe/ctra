package config

import (
	"log"
	"path/filepath"

	"github.com/blevesearch/bleve"
)

const ITEMCOLLECTION = "Item"

func BleveInit(config *Conf, dbPath string) error {

	err := config.CreateUsersBleveIndex(dbPath, ITEMCOLLECTION)
	if err != nil {
		log.Println(err)
	}
	return nil
}

func CreateBleveIndex() (bleve.Index, error) {
	mapping := bleve.NewIndexMapping()
	log.Println(config.BleveFile)
	bIndex, err := bleve.New(config.BleveFile, mapping)
	if err != nil {
		log.Println(err)
		return bIndex, err
	}

	return bIndex, nil
}

func (config *Conf) CreateDefaultBleveIndex(dbPath, collection string) error {
	var err error

	mapping := bleve.NewIndexMapping()
	config.BleveIndexes[collection], err = bleve.New(filepath.Join(dbPath, collection+".bleve"), mapping)
	if err != nil {
		config.BleveIndexes[collection], err = bleve.Open(filepath.Join(dbPath, collection+".bleve"))
		if err != nil {
			log.Println(err)
		}
	}
	return err
}

func (config *Conf) CreateShopsBleveIndex(dbPath, collection string) error {
	var err error

	indexMapping := bleve.NewIndexMapping()
	shopMapping := bleve.NewDocumentMapping()
	indexMapping.AddDocumentMapping("Shop", shopMapping)

	geoMapping := bleve.NewGeoPointFieldMapping()
	shopMapping.AddFieldMappingsAt("Geo", geoMapping)
	config.BleveIndexes[collection], err = bleve.New(filepath.Join(dbPath, collection+".bleve"), indexMapping)
	if err != nil {
		config.BleveIndexes[collection], err = bleve.Open(filepath.Join(dbPath, collection+".bleve"))
		if err != nil {
			log.Println(err)
		}
	}
	return err
}

func (config *Conf) CreateProductsBleveIndex(dbPath, collection string) error {
	var err error

	indexMapping := bleve.NewIndexMapping()
	productMapping := bleve.NewDocumentMapping()
	indexMapping.AddDocumentMapping("Product", productMapping)

	geoMapping := bleve.NewGeoPointFieldMapping()
	productMapping.AddFieldMappingsAt("Geo", geoMapping)
	config.BleveIndexes[collection], err = bleve.New(filepath.Join(dbPath, collection+".bleve"), indexMapping)
	if err != nil {
		config.BleveIndexes[collection], err = bleve.Open(filepath.Join(dbPath, collection+".bleve"))
		if err != nil {
			log.Println(err)
		}
	}
	return err
}

func (config *Conf) CreateGenericBleveIndex(dbPath, collection string) error {
	var err error

	indexMapping := bleve.NewIndexMapping()
	config.BleveIndexes[collection], err = bleve.New(filepath.Join(dbPath, collection+".bleve"), indexMapping)
	if err != nil {
		config.BleveIndexes[collection], err = bleve.Open(filepath.Join(dbPath, collection+".bleve"))
		if err != nil {
			log.Println(err)
		}
	}
	return err
}

func (config *Conf) CreateOrdersBleveIndex(dbPath, collection string) error {
	return config.CreateGenericBleveIndex(dbPath, collection)
}

func (config *Conf) CreateUsersBleveIndex(dbPath, collection string) error {
	return config.CreateGenericBleveIndex(dbPath, collection)
}
