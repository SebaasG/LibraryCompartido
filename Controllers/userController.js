

export class userCtrl {
  constructor({ userMdl }) {
    this.userMdl = userMdl;
  }

  // Crear el Usuario
  createUser = async (req, res) => {
    try {
      const body = req.body;
      const result = await this.userMdl.userCreate({ body });
      res.status(200).send(result);
    } catch (err) {
      console.log("Error en el controlador, CreateUser", err);
      res.status(500).send("Hubo un error interno en el servidor");
    }
};
    // Verificar el usuario
    verifyUser = async (req, res) => {
      try {
        const body = req.body;
        const result = await this.userMdl.verifyUser({ body });
        res.status(200).send(result);
      } catch (err) {
        console.log("Error en el controlador, verifyUser", err);
        res
          .status(404)
          .send("Hubo un error interno en la verificacion del usuario");
      }
    };
    // const result = this.userMdl.userCreate({body});
    // if(!result) res.json({message:'Hubo un error al crear el usuario'});
  
}

