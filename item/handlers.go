package item

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/asdine/storm"
	"github.com/blevesearch/bleve"
	"github.com/tonyalaribe/ctra/config"

	"github.com/btshopng/btshopng/messages"
	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

type Item struct {
	CreatedAt     time.Time
	ModifiedAt    time.Time `storm:"index"`
	LastRenewedAt time.Time
	ID            int `storm:"id,index,increment"` // primary key with auto increment
	MetaData      struct {
		FormNumber string `json:"FormNumber"`
		SlotNumber string `json:"SlotNumber"`
	} `json:"MetaData"`
	VehicleOwnersBio struct {
		FirstName                 string `json:"FirstName"`
		LastName                  string `json:"LastName"`
		OtherName                 string `json:"OtherName"`
		Gender                    string `json:"Gender"`
		DateOfBirth               string `json:"DateOfBirth"`
		MaritalStatus             string `json:"MaritalStatus"`
		OfficeAddress             string `json:"OfficeAddress"`
		ResidentialAddress        string `json:"ResidentialAddress"`
		PhoneNumbers              string `json:"PhoneNumbers"`
		Occupation                string `json:"Occupation"`
		Religion                  string `json:"Religion"`
		LocalGovernmentOfOrigin   string `json:"LocalGovernmentOfOrigin"`
		StateOfOrigin             string `json:"StateOfOrigin"`
		Nationality               string `json:"Nationality"`
		NameOfNextOfKin           string `json:"NameOfNextOfKin"`
		RelationshipWithNextOfKin string `json:"RelationshipWithNextOfKin"`
		PhoneNumberOfNextOfKin    string `json:"PhoneNumberOfNextOfKin"`
		OwnersPassport            string `json:"OwnersPassport"`
	} `json:"VehicleOwnersBio"`
	DriversBio struct {
		FirstName                 string `json:"FirstName"`
		LastName                  string `json:"LastName"`
		OtherName                 string `json:"OtherName"`
		Gender                    string `json:"Gender"`
		DateOfBirth               string `json:"DateOfBirth"`
		MaritalStatus             string `json:"MaritalStatus"`
		OfficeAddress             string `json:"OfficeAddress"`
		ResidentialAddress        string `json:"ResidentialAddress"`
		PhoneNumbers              string `json:"PhoneNumbers"`
		Occupation                string `json:"Occupation"`
		Religion                  string `json:"Religion"`
		LocalGovernmentOfOrigin   string `json:"LocalGovernmentOfOrigin"`
		StateOfOrigin             string `json:"StateOfOrigin"`
		Nationality               string `json:"Nationality"`
		NameOfNextOfKin           string `json:"NameOfNextOfKin"`
		RelationshipWithNextOfKin string `json:"RelationshipWithNextOfKin"`
		PhoneNumberOfNextOfKin    string `json:"PhoneNumberOfNextOfKin"`
		DriversPhotograph         string `json:"DriversPhotograph"`
		DriversThumbprint         string `json:"DriversThumbprint"`
	} `json:"DriversBio"`
	GuarantorsBio struct {
		FirstName               string `json:"FirstName"`
		LastName                string `json:"LastName"`
		OtherName               string `json:"OtherName"`
		Gender                  string `json:"Gender"`
		DateOfBirth             string `json:"DateOfBirth"`
		MaritalStatus           string `json:"MaritalStatus"`
		OfficeAddress           string `json:"OfficeAddress"`
		ResidentialAddress      string `json:"ResidentialAddress"`
		PhoneNumbers            string `json:"PhoneNumbers"`
		Occupation              string `json:"Occupation"`
		Religion                string `json:"Religion"`
		LocalGovernmentOfOrigin string `json:"LocalGovernmentOfOrigin"`
		StateOfOrigin           string `json:"StateOfOrigin"`
		Nationality             string `json:"Nationality"`
		GuarantorsPassport      string `json:"GuarantorsPassport"`
		GuarantorsIdentity      string `json:"GuarantorsIdentity"`
	} `json:"GuarantorsBio"`
	VehicleDetails struct {
		RegistrationNumber   string `json:"RegistrationNumber"`
		TypeOfVehicle        string `json:"TypeOfVehicle"`
		VehicleLicenseNumber string `json:"VehicleLicenseNumber"`
		ChasisNumber         string `json:"ChasisNumber"`
		EngineNumber         string `json:"EngineNumber"`
		InsuranceNumber      string `json:"InsuranceNumber"`
		PhotographOfVehicle  string `json:"PhotographOfVehicle"`
	} `json:"VehicleDetails"`
}

func Create(w http.ResponseWriter, r *http.Request) {
	item := Item{}

	err := json.NewDecoder(r.Body).Decode(&item)
	if err != nil {
		log.Println(err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, messages.ErrInternalServer)
		return
	}

	// check if each field is not empty...
	if item.MetaData.FormNumber == "" || item.MetaData.SlotNumber == "" {
		render.Status(r, 401)
		render.JSON(w, r, messages.ErrBadToken)
		return
	}
	if item.VehicleOwnersBio.OwnersPassport == "" || item.VehicleOwnersBio.FirstName == "" ||
		item.VehicleOwnersBio.LastName == "" || item.VehicleOwnersBio.PhoneNumbers == "" {
		render.Status(r, 401)
		render.JSON(w, r, messages.ErrBadToken)
		return
	}
	if item.DriversBio.FirstName == "" || item.DriversBio.LastName == "" ||
		item.DriversBio.DriversPhotograph == "" || item.DriversBio.PhoneNumbers == "" {
		render.Status(r, 401)
		render.JSON(w, r, messages.ErrBadToken)
		return
	}
	if item.GuarantorsBio.FirstName == "" || item.GuarantorsBio.LastName == "" ||
		item.GuarantorsBio.PhoneNumbers == "" || item.GuarantorsBio.GuarantorsPassport == "" {
		render.Status(r, 401)
		render.JSON(w, r, messages.ErrBadToken)
		return
	}
	if item.VehicleDetails.RegistrationNumber == "" || item.VehicleDetails.TypeOfVehicle == "" ||
		item.VehicleDetails.VehicleLicenseNumber == "" || item.VehicleDetails.ChasisNumber == "" ||
		item.VehicleDetails.EngineNumber == "" || item.VehicleDetails.InsuranceNumber == "" ||
		item.VehicleDetails.PhotographOfVehicle == "" {
		render.Status(r, 401)
		render.JSON(w, r, messages.ErrBadToken)
		return
	}
	item.CreatedAt = time.Now()
	item.ModifiedAt = time.Now()
	item.LastRenewedAt = time.Now()

	// byt, err := base64.StdEncoding.DecodeString(strings.Split(item.VehicleOwnersBio.OwnersPassport, "base64,")[1])
	// if err != nil {
	// 	log.Println(err)
	// }
	//
	// bytReader := bytes.NewReader(byt)
	// im, err := png.Decode(bytReader)
	// if err != nil {
	// 	log.Println("Bad png")
	// }
	//
	// f, err := os.OpenFile(slug.Make(
	// 	item.VehicleOwnersBio.FirstName+" "+item.VehicleOwnersBio.LastName)+" "+"Owners Passport"+".png",
	// 	os.O_WRONLY|os.O_CREATE, 0777)
	// if err != nil {
	// 	log.Println("Cannot open file")
	// }
	//
	// png.Encode(f, im)

	conf := config.Get()
	err = conf.Storm.Save(&item)
	if err != nil {
		log.Println(err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, messages.ErrInternalServer)
		return
	}
	conf.BleveIndexes["items"].Index(strconv.Itoa(item.ID), item)
	render.Status(r, http.StatusOK)
	render.JSON(w, r, messages.Success)
}

func GetAll(w http.ResponseWriter, r *http.Request) {
	items := []Item{}
	conf := config.Get()
	err := conf.Storm.AllByIndex("ModifiedAt", &items, storm.Limit(10), storm.Reverse())
	// err := conf.Storm.All(&items)
	if err != nil {
		log.Println(err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, messages.ErrInternalServer)
		return
	}
	render.Status(r, http.StatusOK)
	render.JSON(w, r, items)
}

func GetOne(w http.ResponseWriter, r *http.Request) {
	v := chi.URLParam(r, "id")
	id, err := strconv.Atoi(v)
	if err != nil {
		log.Println(err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, messages.ErrInternalServer)
		return
	}

	log.Println(id)
	item := Item{}
	conf := config.Get()
	err = conf.Storm.One("ID", id, &item)
	if err != nil {
		log.Println(err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, messages.ErrInternalServer)
		return
	}
	render.Status(r, http.StatusOK)
	render.JSON(w, r, item)
}

func Search(w http.ResponseWriter, r *http.Request) {
	q := chi.URLParam(r, "q")
	if len(q) < 1 {
		log.Println("query small o: ", q)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, messages.ErrInternalServer)
		return
	}
	log.Println(q)
	items := []Item{}
	conf := config.Get()

	query := bleve.NewQueryStringQuery(q)
	searchRequest := bleve.NewSearchRequest(query)
	log.Println("Search request created...")
	searchResult, err := conf.BleveIndexes["items"].Search(searchRequest)
	if err != nil {
		log.Println(err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, messages.ErrInternalServer)
		return
	}
	log.Println(searchResult.Hits)
	if len(searchResult.Hits) > 0 {
		for _, v := range searchResult.Hits {
			log.Println(v.ID)
			item := Item{}
			err = conf.Storm.One("ID", v.ID, &item)
			if err != nil {
				log.Println(err)
				continue
			}
			items = append(items, item)
		}
	}
	// err = conf.Storm.
	// if err != nil {
	// 	log.Println(err)
	// 	render.Status(r, http.StatusInternalServerError)
	// 	render.JSON(w, r, messages.ErrInternalServer)
	// 	return
	// }
	render.Status(r, http.StatusOK)
	render.JSON(w, r, items)
}
