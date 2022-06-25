// Don't forget to update the corresponding client-side .ts model if you update this one

class Preview {

    name;
    img;
    uuid;

    constructor(name, img, uuid) {

        this.name = name;
        this.img = img;
        this.uuid = uuid;
        
    }
}

module.exports = Preview;