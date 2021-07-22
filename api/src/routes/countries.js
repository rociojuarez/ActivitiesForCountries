const { Router } = require('express');
const axios = require('axios').default;
const cors = require('cors');
const router = Router();
const {Country, Activity, countries_activities} = require('../db');
const {Op} = require('sequelize');

router.use(cors());

//Me traigo y guardo la data del endpoint y luego queda en mi base de datos.
router.get('/', async (req, res) => {
    //Guardo el parametro de nombre por si se esta realizando una busqueda
    const name = req.query.name;
    try {
        //Verifico si mi base de datos esta cargada
        let bdLlena = await Country.findAll({include: {
            model: Activity
          }});
        //Si no esta cargada se carga
        if(!bdLlena.length) {
            const api = await axios.get("https://restcountries.eu/rest/v2/all");
            const result = api.data.forEach(async (country) => {  
                await Country.create({
                    name : country.name,
                    id: country.alpha3Code,
                    flag : country.flag,
                    region : country.region,
                    capital : country.capital,
                    subregion : country.subregion,
                    area: country.area,
                    population : country.population
                })
            })

            console.log('Base de datos cargada');
            res.status(200).json(result);
        }
    } catch {
        res.sendStatus(404);
    }

    //Si se esta realizando una busqueda por query parameter
    if(name) {
        try {
            let pais = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: '%'+name+'%'
                    }
                }, 
                include: {
                    model: Activity
                  }
            })
            return res.status(200).json(pais);
        } catch {
            res.sendStatus(404);
        }
    } else if(req.query.filter){
        try {
            let country = await Country.findAll({
                where: {
                    region: req.query.filter
                },
                limit: 10,
                offset: req.query.page,
                order: [[req.query.orderBy, req.query.order]],
                include: {model: Activity}
            });
            return res.json(country)
        } catch (error) {
            console.log(error)
        }
    }
    else {
        try {
            let pais = await Country.findAll({
                include: {
                    model: Activity
                  },
                //Paginado
                limit: 10,
                offset: req.query.page,
                order: [[req.query.orderBy, req.query.order]]
            });
            return res.json(pais)
        } catch (error) {
            console.log(error)
        }
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
        try {
            let pais = await Country.findOne({
                where: {
                    id: id
                },
                include: {model: Activity}
            });
            return res.status(200).json(pais)
        } catch {
            res.sendStatus(404);
        }
});


module.exports = router;