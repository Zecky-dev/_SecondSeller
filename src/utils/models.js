function Message(id,message,owner,date) {
    this.id = id;
    this.message = message;
    this.owner = owner;
    this.date = date;
}

function AdvertisementModel(id,name,price,description,location,imageURL,owner) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.location = location;
    this.imageURL = imageURL;
    this.owner = owner;
}

export {
    Message,
    AdvertisementModel
}