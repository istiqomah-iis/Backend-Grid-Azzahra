const db = require('../config/db.js');
const {v4 : uuidv4} = require('uuid');

exports.createCategories = async (req, res) => {
    try{
        const {name} = req.body;
        const id     = uuidv4();

        const cekName = await db.any(`select * from categories where name = $1`, [name]);
        if(!cekName){
            res.status(404).json({message: `Name tidak ditemukan`});
        }else{
            await db.none(`insert into categories (id, name) values ($1, $2)`,
                [id, name]
            );
            res.status(201).json({message: `Data Categories Berhasil di Simpan`});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({Error : err.message});
    }
};

exports.getAllCategories = async (req, res) => {
    try{
        const getAllCategori = await db.any(`select * from categories`);
        if(getAllCategori){
            res.status(200).json({Data: getAllCategori});
        }else{
            res.status(404).json({message: `Data Categori Tidak di Temukan`});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({Error: err.message});
    }
};

exports.getCategoriesById = async (req, res) => {
    try{
        const {id} = req.params;

        const getCategoriById = await db.oneOrNone(`select * from categories where id = $1`, [id]);
        if(getCategoriById === 0){
            res.status(404).json({message: `Data Categori tidak di temukan`});
        }else{
            res.status(200).json({Data: getCategoriById});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({Error: error.message});
    }
};

exports.updateCategories = async (req, res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;

        if(name == ""){
            res.status(401).json({message: `Nama Wajib di isi !`});
        }else{
            const updateCategories = await db.oneOrNone(`update categories set name = $1 where id = $2 returning *`, [name, id]);
            console.log(updateCategories);
            if(!updateCategories){
                res.status(404).json({message: `Data Categories Tidak Terupdate`});
            }else{
                res.status(200).json({message: `Data Berhasil Terupdate`, Data: updateCategories});
            }
        }
    }catch(error){
        console.error(error);
        res.status(500).json({Error: error.message});
    }
};

exports.deleteCategories = async (req, res) => {
    try{
        const {id} = req.params;

        const deleteCategories = await db.oneOrNone(`delete from categories where id = $1 returning *`, [id]);
        if(!deleteCategories){
            res.status(400).json({message:`Data tidak terhapus`});
        }else{
            res.status(200).json({message: `Data Categories Berhasil Terhapus`});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({Error: error.message});
    }
};