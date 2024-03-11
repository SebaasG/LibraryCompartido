export class userCtrl {
    constructor ({ userMdl }){
        this.userMdl = userMdl;
    }

    createUser = async (req,res)=>{
        try{
            const body = req.body;
            const result = await this.userMdl.userCreate({body});
            if(!result){
                res.status(500).send('Hubo un error en el servidor');        
            }
            res.status(200).send('Se creo el usuario correctamente');
        }  catch(err){
            console.log('Error en el controlador', err);
            res.status(404).send('Hubo un error interno en el servidor')
        }
        // const result = this.userMdl.userCreate({body});
        // if(!result) res.json({message:'Hubo un error al crear el usuario'});


    }

}