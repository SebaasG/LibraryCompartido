export class userCtrl {
    constructor ({ userMdl }){
        this.userMdl = userMdl
    }

    createUser = async (req,res)=>{
        try{
            if(!req.body) return 'Error, no esta insertando correctamente los datos.'
            const body = req.body;
            console.log(body);
            res.status(200).send('Se subio el usuario correctamente');
        }
        catch(err){
            console.log('error', err);
        }
        // const result = this.userMdl.userCreate({body});
        // if(!result) res.json({message:'Hubo un error al crear el usuario'});


    }

}