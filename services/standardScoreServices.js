const mongoose = require("mongoose");
const StandardScores = mongoose.model("StandardScores");
const AppError = require("../modules/ErrorHandeler/AppError");

const { ARGUMENT_ERROR, MONGO_ERROR } = AppError.APP_ERRORS;

class StandardScoreServices {
  /**
   * @param {ObjectID} ObjectID of StandardScores
   * @throws Error - Nie ma ID  || MongoDB Error!
   * @returns StandardScores as per id
   * @async
   * x
   */
  static getByID(id) {
    console.log("id to: ", id);
    // if (!this.isValidId(id)) {
    //   throw new AppError("wez mnie z tym id", ARGUMENT_ERROR);
    // }
    return StandardScores.findById(id)
      .then((doc) => {
        console.log("to jest doc: " + doc);
        return doc;
      })
      .catch((err) => {
        throw Error("brak id - blad ze zwyklej klasy error");
      });
  }

  static isValidId(id) {
    return (
      mongoose.Types.ObjectId.isValid(id) &&
      new mongoose.Types.ObjectId(id) === id
    );
  }
  /**
   *
   * @param {String} id
   * @throws lack of parameter || MongoDB Err
   * @returns StandardScores depends on the given id
   * @async
   * x
   */
  static async getAll(id = null) {
    if (!id || id === null) {
      try {
        return await StandardScores.find().exec();
      } catch (err) {
        throw new AppError("coś nie tak z baza danych", MONGO_ERROR, err);
      }
    }
    if (id) {
      try {
        return await this.getByID(id);
      } catch (err) {
        throw new AppError("ID niepoprawne", MONGO_ERROR);
      }
    }
  }

  /**
   * @param {object} score
   * @returns created score data
   * @throws Error if score data not recieved || mongoDB othervise or if score object has no enough data
   * x
   */
  static async create(score) {
    // console.log("server addres service " + score)
    if (!score) {
      throw new AppError("brak adresu", ARGUMENT_ERROR);
    }
    const Score = new StandardScores(score);
    // return score.save()
    //   .then((doc) => {
    //     console.log('serwer sdres service DOC ' + doc)
    //     return doc;
    //   })
    //   .catch((err) => {
    //     throw new AppError("blad mongodb", MONGO_ERROR, err);
    //   });

      try {
        // console.log("stworz score + " + score)
        const doc = await Score.save()
        return doc
    }
    catch {
        console.log("error przy Tworzeniu adresu")
    }

  }

    /**
   * @param {object} StandardScores
   * @returns created StandardScores data
   * @throws Error if StandardScores data not recieved || mongoDB othervise or if StandardScores object has no enough data
   * x
   */
  static async createMany(StandardScores) {
    if (!StandardScores) {
      throw new AppError("brak adresów", ARGUMENT_ERROR);
    }
    for(var i in StandardScores)
      await this.create(StandardScores [i]);
  }

  /**
   *
   * @param {Object} score
   * @throws Error if id of the score you want to update not exist or if Provided score object has no id
   * @returns updated score
   * @async
   * x
   */
  static async update(score) {
    if (!score || !score._id) {
      throw new AppError("brak adresu do aktualizacji", ARGUMENT_ERROR);
    }
    try {
      const doc = await StandardScores.findOneAndUpdate(
        { _id: score._id },
        score,
        { new: true }
      );
      return {
        score: doc,
        message: "Updated",
      };
    } catch (err) {
      throw new AppError("blad mongodb", MONGO_ERROR, err);
    }
  }

  /**
   *
   * @param {String} id
   * @throes Error if lack of id or there is no score with provided id
   * @returns deleted score
   * @async
   * x
   */
  static async delete(id) {
    if (!id) {
      throw new AppError("brak id - arg err", ARGUMENT_ERROR);
    }
    try {
      return await StandardScores.findOneAndDelete({
        _id: id,
      });
    } catch (err) {
      throw new AppError("id nie znalezione - mongo err", MONGO_ERROR, err);
    }
  }
}

module.exports = StandardScoreServices;
