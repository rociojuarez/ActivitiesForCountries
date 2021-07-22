const { Router } = require('express');
//Instalo y requiero axios
const axios = require('axios');
const {Country, Activity, countries_activities} = require('../db');
const cors = require('cors');
const router = Router();

router.use(cors());

router.post('/', async (req, res) => {
    const activity = req.body
    // name, difficulty, duration, seasons, countries:[names]
    try {
        //Se crea la actividad sin los paises
        let [act, created] = await Activity.findOrCreate({
            where: {
                name: activity.name,
                difficulty: activity.difficulty,
                duration: activity.duration,
                seasons: activity.seasons,
            }
        });
        //Nos muestra si se creo o no
        console.log(created)
        //Seteo la relacion actividad-paises
        await act.setCountries(activity.countriesId)
        return res.json(act)
    } catch (error) {
        console.log(error)
    }
});

router.get("/", async (req, res, next) => {
    if(req.query.filter){
        try {
            let paises = await Activity.findAll({
                where: {
                    seasons:req.query.filter
                },
                include: {model: Country}

            });
            return res.json(paises)
        } catch (error) {
            console.log(error)
        }
    } else{
    try{
        const db = await Activity.findAll()
        return res.send(db).status(200)
    } catch (e) {
        return res.json(e.message).status(409)
    }
}
})


/* router.put('/:id', async (req,res) => {
    const id = req.params.id
    const activity = req.body

    try {
        let act = await Activity.update(activity, {
            where: {
                id : id
            }
        });
        return res.json({update : true})
    } catch (error) {
        console.log(error)
    }
});
 */
/* router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        let act = await Activity.destroy({
            where: {
                id: id
            }
        });
        return res.json({delete:true})
    } catch (error) {
        console.log(error)
    }
});
 */
module.exports = router;