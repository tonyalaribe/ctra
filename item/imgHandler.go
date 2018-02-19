package item

import (
	"bytes"
	"encoding/base64"
	"errors"
	"image/jpeg"
	"image/png"
	"log"
	"os"
	"strings"

	uuid "github.com/satori/go.uuid"
)

func UploadImage(imageString string) (string, error) {
	coI := strings.Index(imageString, ",")
	imageType := strings.TrimSuffix(imageString[5:coI], ";base64")
	rawImage := imageString[coI+1:]
	name := ""
	// Encoded Image DataUrl //
	unbased, err := base64.StdEncoding.DecodeString(rawImage)
	if err != nil {
		log.Println(err)
		return name, err
	}

	switch imageType {
	case "image/png":
		pngI, err := png.Decode(bytes.NewReader(unbased))
		// ...
		name = uuid.NewV4().String() + ".png"
		f, err := os.Create("./public/assets/img/uploads/" + name)
		if err != nil {
			log.Println(err)
			return "", err
		}
		err = png.Encode(f, pngI)
		if err != nil {
			log.Println(err)
			return "", err
		}
		defer f.Close()
	case "image/jpeg":
		jpgI, err := jpeg.Decode(bytes.NewReader(unbased))
		// ...
		name = uuid.NewV4().String() + ".jpg"
		f, err := os.Create("./public/assets/img/uploads/" + name)
		if err != nil {
			log.Println(err)
			return "", err
		}
		err = jpeg.Encode(f, jpgI, &jpeg.Options{Quality: 75})
		if err != nil {
			log.Println(err)
			return "", err
		}
		defer f.Close()
	default:
		return "", errors.New("Invalid Image type")
	}
	return name, nil
}
