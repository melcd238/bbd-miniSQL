import * as fs from 'fs';


export class Table {
    private iDfilePath = "./id.minisql";
    private filePath = "./db.minisql";
    private table: any = [];
    

    constructor() {
      try {
        const data = fs.readFileSync(this.filePath);
        this.table = JSON.parse(data.toString());
      } catch (error) {
        // si le fichier n'existe pas encore on utilise un tableau vide
      }
    }

    public insert(username: string) {
        let id = 1;
        try {
            const Iddata = fs.readFileSync(this.iDfilePath);
            id = parseInt(Iddata.toString()) + 1;
        } catch (error) {
            // si le fichier n'existe pas encore on utilise l'id 1
        }
        fs.writeFileSync(this.iDfilePath, id.toString());
        
        const row = {id:id, username};
        this.table.push(row);
        this.scanToFile();
        
        process.stdout.write(`added: id=${row.id}, username=${row.username}\n`);

 }

    public scanToFile() {
        const data = Buffer.from(JSON.stringify(this.table));
        fs.writeFileSync(this.filePath, data);
    }
    
    public select() {
        process.stdout.write(`found ${this.table.length} entries:\n`)
        this.table.forEach((row: any) => {
            process.stdout.write(`-> id=${row.id}, username=${row.username}\n`);
        });
    }

    public selectWithUsername(username: string) {
       let copy: any = [];
      
        this.table.forEach((row: any) => {
            if (row.username === username) {
               copy.push(row);
            }
        });
        if (copy.length > 0) {
            process.stdout.write(`found ${copy.length} entries:\n`)
            copy.forEach((row: any) => {
                process.stdout.write(`-> id=${row.id}, username=${row.username}\n`);
                
            });
        } else {
            process.stdout.write(`found 0 entries\n`)
        }
        
      
    }

}
