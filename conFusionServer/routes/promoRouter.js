var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Promotions = require('../models/promotions');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get((req,res,next) =>  {
        Promotions.find({})
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));
    })

    .put(authenticate.verifyUser, (req, res, next) =>  {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })

    .post(authenticate.verifyUser, (req, res, next) =>  {
        Promotions.create(req.body)
    .then((promotion) => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
    })

    .delete(authenticate.verifyUser, (req, res, next) =>  {
        Promotions.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));   
    });

promoRouter.route('/:promotionId')
    .get((req,res,next) =>  {
        Promotions.findById(req.params.promotionId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
    })
    
    .put(authenticate.verifyUser, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, { new: true })
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));
    })

    .post(authenticate.verifyUser, (req, res, next) =>  {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotion/'+ req.params.promotionId);
    })  

     .delete(authenticate.verifyUser, (req, res, next) =>  {
        Promotions.findByIdAndRemove(req.params.promotionId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });

exports.router = promoRouter;