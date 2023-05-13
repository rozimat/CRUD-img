const { v4 : uuid } = require("uuid");
const Io = require("../utils/Io");
const Images = new Io("./db/img.src.json");
const Image = require("../models/Images");
//Rcreate , Rread, Rupdate, Rdelete

exports.Rread = async (req,res)=>{
  const images = await Images.read();
  console.log(images);
  res.status(200).json({ message: "Sucsesfully"})
}
exports.Rcreate = async (req,res)=>{
  const images = await Images.read();
  const { img } = req.files;
  const imgNme = `${uuid()}.${img.mimetype.split("/")[1]}`;
  const id = (images[images.length +1]?.id || 0)+1;
  const newImg = new Image(id, imgNme);
  const data = images.length ? [...images, newImg] : [newImg];
  img.mv(`${process.cwd()}/uploads/${imgNme}`);
  Images.write(data);
  res.status(201).json({ message: "Sucsessfully created!"})
}
exports.Rupdate = async (req,res)=>{
  const images = await Images.read();
  const {img} = req.files;
  const imgNme = `${uuid()}.${img.mimetype.split("/")[1]}`;
  const url = req.url;
  const id = url.split('/')[url.split("/").length-1];
  findId = images.find( (img)=> img.id == id);
  findId.img = imgNme;
  img.mv(`${process.cwd()}/uploads/${imgNme}`);
  Images.write(images);
  res.status(403).json({ message: "Sucsessfully edited!"})
  
}
exports.Rdelete = async (req,res)=>{
  const images = await Images.read();
  const url = req.url;
  const id = url.split('/')[url.split("/").length-1];
  images.splice( (img)=> img.id == id);

  Images.write(images);
  res.status(403).json({ message: "Sucsessfully deleted!"})
}