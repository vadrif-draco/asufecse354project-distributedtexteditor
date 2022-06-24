// Don't forget to update the corresponding server-side .js model if you update this one

export class Preview {

    name: string;
    img: string;
    url: string;

    constructor(name: string, img: string, url: string) {

        this.name = name;
        this.img = img;
        this.url = url;
        
    }
}