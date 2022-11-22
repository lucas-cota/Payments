//server.ts
import app from './app';
import database from './db';

(async() => {
    
    try{
        const port = parseInt(`${process.env.PORT}`);
    
        await database.sync();
        console.log(`Rodando database ${process.env.DB_NAME}`)
        
        await app.listen(port);
        console.log(`API Rodando na porta ${port}`);        
    }
    catch(error){
        console.log(`${error}`);
    } 

    
})();