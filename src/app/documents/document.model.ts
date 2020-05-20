export class Document {
    documentId: string;
    name: string;
    description: string;
    url: string;
    children: [Document];

    constructor(documentId: string, name: string, description: string, url: string, children: [Document]) {
        this.documentId = documentId;
        this.name = name;
        this.description = description;
        this.url = url;
        this.children = children;    
    }
}