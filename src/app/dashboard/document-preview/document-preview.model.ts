// Don't forget to update the corresponding server-side .js model if you update this one

export class Preview {

    name: string;
    img: string;
    uuid: string;

    constructor(name: string, img: string, uuid: string) {

        this.name = name;
        this.img = img;
        this.uuid = uuid;
        
    }
}