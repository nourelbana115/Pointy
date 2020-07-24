const { loyaltyPrograms } = require('../../db/models/loyaltyProgram')
const logger = require('../../utilities/logger');



const updateLoyaltyProgramsModel = async (query, object) => {
  try {
    return await loyaltyPrograms.updateMany(query, object)

  } catch (err) {
    logger.log('requests', 'error', err, 'update loyalty programs')
  }

}

const updateOneLoyaltyProgramModel = async (query, object) => {
  try {
    return await loyaltyPrograms.updateOne(query, object)

  } catch (err) {
    logger.log('requests', 'error', err, 'update loyalty program')
  }
}

const deactivateOtherLoyaltyPrograms = async (program) => {
  return await updateLoyaltyProgramsModel(
    {
      merchant: program.merchant._id,
      loyaltyType:{$ne:1},
      _id: { $nin: program._id }
    },
    {
      $set: {
        "status": "draft",
        "updatedAt": new Date()
      }

    }
  )
}

const activateLoyaltyProgram = async (program) => {
  return await updateOneLoyaltyProgramModel(
    {
      merchant: program.merchant._id,
      _id: program._id
    },
    {
      $set: {
        activationDate: new Date(),
        status: 'active',
        updatedAt: new Date()
      }
    }
  )
}

const deactivateLoyaltyProgram = async (program) => {
  return await updateOneLoyaltyProgramModel(
    {
      merchant: program.merchant._id,
      _id: program._id
    },
    {
      $set: {
        status: 'draft',
        updatedAt: new Date()
      }
    }
  )
}

const loyaltyProgramActivation = async (program) => {
    await deactivateOtherLoyaltyPrograms(program)
    return  await activateLoyaltyProgram(program)
}



module.exports = {
  loyaltyProgramActivation,
  deactivateLoyaltyProgram,
  activateLoyaltyProgram
}
