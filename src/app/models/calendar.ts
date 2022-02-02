export class Calendar{
    title: string;
    start: string;
    end: string;
    description: string;
    backgroundColor: string

    constructor(title:string,start: string, end: string, description: string, backgroundColor: string){
        this.title = title;
        this.start = start;
        this.end =  end;
        this.description = description;      
        this.backgroundColor = backgroundColor;  
    }
}