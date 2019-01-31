'use strict'

const validUrl = require('valid-url');
const urlShorten = require('../models/urlShorten');
const shortId = require('shortid');
//const shorturl = require('shorturl');//not working
const dns = require('dns');

function pruebas(req, res){
  res.status(200).send({
    message: 'Probando controlador'
  });
}

function getShortUrl(req, res){
  var {shorturl}  = req.body;
  
  if(!shorturl){
    res.status(500).send({message: 'Error fill de url'});
  }
  urlShorten.findOne({shortUrl: shorturl}, (err, data) =>{
    if(err) {      
      res.status(500).send({message: 'error in the get request'});
    }else{
      if(!data){
        res.status(404).send({message:'url does not exists'});
      }else{
        console.log('redirecting...');
        res.redirect(data.originalUrl);
      }
    }   
  });
  
}

function postShortUrl(req, res){
  var originalUrl  = req.body.url;
  var checkOriginalUrl = originalUrl.slice(originalUrl.indexOf('/')+2, originalUrl.length);
  
  var url_ok = dns.lookup(checkOriginalUrl,function(err, addresses, family){
    return addresses;
  });  
    
  if(url_ok/*validUrl.isUri(originalUrl)*/){
    urlShorten.findOne({originalUrl: originalUrl}, (err, data)=>{
      if(err) {      
      res.status(500).send({message: 'error on the post'});
    }else{
      if(!data){
        const updatedAt = new Date();
        /*
        //shorturl method is not working
        const shortUrl = shorturl(originalUrl, function(result){
          res.status(200).send({message: result});
          return result;
        });*/
        var shortUrl = shortId.generate();
        var url = new urlShorten({
          originalUrl: originalUrl,
          shortUrl: shortUrl,
          updatedAt: updatedAt
        });
        
        url.save((err, urlStored) =>{
          if(err){
            res.status(500).send({message:'Error saving the url'});
          }else{
            if(!urlStored){
              res.status(404).send({message:'Error savinf the url'});
            }            
            // everthing Ok
             res.status(200).send({original_url: originalUrl, short_cut: shortUrl});
          }
        });         
       
      }else{
        console.log('redirecting...');
        res.redirect(data.originalUrl);
      }
    }
    });
  }else{
    res.status(401).json('Invalid Original Url');
  }
  
}

module.exports = {
  pruebas,
  getShortUrl,
  postShortUrl
};