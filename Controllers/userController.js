export class userCtrl {
  constructor({ userMdl }) {
    this.userMdl = userMdl;
  }

  // Crear el Usuario
  createUser = async (req, res) => {
    try {
      const body = req.body;
      const result = await this.userMdl.userCreate({ body });
      if ((result === 1))res.status(200).json();
       else if (result === 2) res.status(409).json();
      else res.status(500).json();
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
      console.log(result);
      if(result === 2) res.status(404).json();
      if(result === 3) res.status(201).json();
      res.status(200).json();
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
