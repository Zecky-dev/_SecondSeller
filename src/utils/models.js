function Message(id,message,owner,date) {
    this.id = id;
    this.message = message;
    this.owner = owner;
    this.date = date;
}

function AdvertisementModel(id,name,price,description,location,category,images,owner) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.location = location;
    this.images = images;
    this.owner = owner;
}

export {
    Message,
    AdvertisementModel
}