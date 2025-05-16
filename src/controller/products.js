const db = require('../config/db.js');
const {v4: uuidv4} = require('uuid');

exports.createProduct = async (req, res) => {
    try{
        const id = uuidv4();
        const {name, category_id, description} = req.body;
        const file = req.file;
        if(!file){
            req.status(400).json({message:`Tidak ada file Product yang terupload`});
        }

        if(name == ""){
            res.status(401).json({message: `Nama Wajib di Isi!`});
        }else if(category_id == ""){
            res.status(401).json({message: `Categori Id Wajib di Isi !`});
        }else if(description == ""){
            res.status(401).json({message: `Description Wajib di Isi!`});
        }else{
            const saveData = await db.one(`insert into products (id, name, category_id, description, image_filename) values ($1, $2, $3, $4, $5) returning *`, [id, name, category_id, description, file.filename]);
            if(!saveData){
                res.status(400).json({message: `Data Products Tidak Tersimpan`});
            }else{
                res.status(201).json({message: `Data Berhasil Tersimpan`, Data:saveData});
            }
        }
    }catch(error){
        console.log(error);
        res.status(500).json({Error: error.message});
    }
};

exports.getAllProducts = async (req, res) => {
    try{
        const getProducts = await db.any(`select * from products`);
        if(getProducts){
            res.status(200).json({Data: getProducts});
        }else{
            res.status(404).json({message: `Data Products Tidak di Temukan`});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({Error: error.message});
    }
};

exports.getProductsById = async (req, res) => {
    try{
        const {id} = req.params;

        const getProductsById = await db.oneOrNone(`select * from products where id = $1`, [id]);
        if(!getProductsById){
            res.status(404).json({message:`Data Products Tidak di Temukan`});
        }else{
            res.status(200).json({Data: getProductsById});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({Error: error.message});
    }
};

exports.updateProducts = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, category_id, description} = req.body;
        const file = req.file;

        if(name == ""){
            res.status(401).json({message: `Name wajib di isi !`});
        }else if(category_id == ""){
            res.status(401).json({message: `Category wajib di isi !`});
        }else if(description == ""){
            res.status(401).json({message: `Deskripsi wajib di isi !`});
        }else{
            const updateProduct = await db.oneOrNone(`update products set name = $1, category_id = $2, description = $3, image_filename = $4 where id = $5 returning *`, 
                [name, category_id, description, file.filename, id]
            );
            if(!updateProduct){
                res.status(400).json({message: `Data Product Tidak Terupdate`});
            }else{
                res.json({message: `Data Product Berhasil Terupdate`, Data: updateProduct});
            }
        }
    }catch(error){
        console.error(error);
        res.status(500).json({Error: error.message});
    }
};

exports.deleteProducts = async (req, res) => {
    try{
        const {id} = req.params;

        const deleteProducts = await db.oneOrNone(`delete from products where id = $1 returning *`, [id]);
        if(!deleteProducts){
            console.log(deleteProducts);
            res.status(404).json({message: `Data Tidak di Temukan`});
        }else{
            res.json({message: `Data Product Berhasil Terhapus`});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({Error: error.message});
    }
};

