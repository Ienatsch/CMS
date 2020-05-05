export class Document {
    id: string;
    name: string;
    description: string;
    url: string;
    children: [Document];

    constructor(id: string, name: string, description: string, url: string, children: [Document]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.children = children;    
    }
}