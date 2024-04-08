export class historyCtrl {
    constructor ({ historyMDL }){
            this.historyMDL = historyMDL;
    }

    getTransac = async(req, res)=> {
        try {
            const { page } = req.params;
            const result = await this.historyMDL.getDataTransac(parseInt(page));
            res.status(200).json(result);
        } catch(e) {
            console.log('Error desde el controlador', e);
        }
    }
}
