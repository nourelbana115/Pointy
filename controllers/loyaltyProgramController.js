const _ = require('lodash');
const express = require('express');
const app = express();
const { generalResponse } = require('../utilities/responseBody')
const { loyaltyPrograms } = require('../db/models/loyaltyProgram');
const loyaltyProgramsServices = require('../services/backendServices/loyaltyProgramServices')
const logger = require('../utilities/logger');

exports.addLoyaltyProgram = async(req, res) => {
    try {
        const body = _.pick(req.body, [
            'title', 'status', 'title_ar', 'description', 'description_ar', 'numOfValidDays',
            'imageUrl', 'type', 'pointValue', 'min', 'max', 'avg', 'minVisits', 'loyaltyType'
        ])
        const merchant = req.merchant;
        if (body.loyaltyType == 1) {
            const programData = {
                merchant: merchant._id,
                title: body.title,
                title_ar: body.title_ar,
                status: body.status,
                description: body.description,
                description_ar: body.description_ar,
                numOfValidDays: body.numOfValidDays,
                imageUrl: body.imageUrl,
                coverImageUrl: req.coverImageUrl,
                pointValue: body.pointValue,
                loyaltyType: body.loyaltyType,
            }
            const newLoyalty = new loyaltyPrograms(programData);
            const savedProgram = await newLoyalty.save();
            if (savedProgram.status == 'active')
                await loyaltyProgramsServices.activateLoyaltyProgram(savedProgram)
                // return await res.send(generalResponse({ ...savedProgram._doc }, {}, 'loyalty program creation'));
        } else if (body.loyaltyType == 2) {
            const programData = {
                merchant: merchant._id,
                title: body.title,
                title_ar: body.title_ar,
                status: body.status,
                description: body.description,
                description_ar: body.description_ar,
                numOfValidDays: body.numOfValidDays,
                imageUrl: body.imageUrl,
                coverImageUrl: req.coverImageUrl,
                type: body.type,
                min: body.min,
                max: body.max,
                avg: body.avg,
                loyaltyType: body.loyaltyType,
                minVisits: body.minVisits

            }
            const newLoyalty = new loyaltyPrograms(programData);
            const savedProgram = await newLoyalty.save();
            if (savedProgram.status == 'active')
                await loyaltyProgramsServices.loyaltyProgramActivation(savedProgram)
                //   return await res.send(generalResponse({ ...savedProgram._doc }, {}, 'loyalty program creation'));
        }
        await res.redirect('/loyaltyprogram/list');
    } catch (err) {
        return await res.status(400).send(generalResponse({}, err, 'loyalty program creation'));
    }
}

exports.getList = async(req, res) => {
    try {
        const loyaltyProgramsList = await loyaltyPrograms.find({ merchant: req.merchant._id })
        if (!loyaltyProgramsList.length) throw ("not found")
        await res.send(generalResponse({ loyaltyProgramsList }, {}, 'Loyalty programs List'));
    } catch (err) {
        await res.status(400).send(generalResponse({}, err, 'cannot get loyalty programs list'));
    }
}

exports.deleteLoyaltyProgram = async(req, res) => {
    try {
        const merchant = req.merchant;
        const loyaltyId = req.params.id
        const deletedProgram = await loyaltyPrograms.findOneAndDelete({ merchant: merchant._id, _id: loyaltyId })
            // res.send(generalResponse({ "deleted program": deletedProgram }, {}, "delete program "))
        await res.redirect("/loyaltyprogram/list")
    } catch (err) {
        res.status(400).send(generalResponse({}, err, "delete program"))
    }
}

exports.activateLoyaltyProgram = async(req, res) => {
    try {

        const loyaltyId = req.params.id
        const foundProgram = await loyaltyPrograms.findById({ _id: loyaltyId }).populate('merchant')
        if (foundProgram.loyaltyType == 1) {
            if (!foundProgram) throw `no program found  `
            const activatedProgram = await loyaltyProgramsServices.activateLoyaltyProgram(foundProgram)
                //     await res.send(generalResponse({ activatedProgram }, {}, 'loyalty program activated successfully'))
        } else if (foundProgram.loyaltyType == 2) {

            if (!foundProgram) throw `no program found  `
            const activatedProgram = await loyaltyProgramsServices.loyaltyProgramActivation(foundProgram)
                //  await res.send(generalResponse({ activatedProgram }, {}, 'loyalty program activated successfully'))
        }
        await res.redirect(`/loyaltyprogram/list/${loyaltyId}`)



    } catch (e) {
        await res.status(400).send(generalResponse({}, e, 'activate loyalty program'))
    }
}

exports.deActivateLoyaltyProgram = async(req, res) => {
    try {
        const loyaltyId = req.params.id
        const merchant = req.merchant;
        const foundProgram = await loyaltyPrograms.findById({ _id: loyaltyId }).populate('merchant')
        if (!foundProgram) throw `no program found  `
        const draftedProgram = await loyaltyProgramsServices.deactivateLoyaltyProgram(foundProgram)
            //  await res.send(generalResponse({ draftedProgram }, {}, " loyalty program deActivated successfully"))
        await res.redirect(`/loyaltyprogram/list/${loyaltyId}`)
    } catch (err) {
        await res.status(400).send(generalResponse({}, err, "deactivate loyalty program"))
    }
}