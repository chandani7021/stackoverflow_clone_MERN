import mongoose from "mongoose";
import Questions from "../models/Questions.js";


export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable..');
    }

    updateNoOfQuestions(_id, noOfAnswers)

    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
            $addToSet: {
                answer: [{ answerBody, userAnswered, userId }]
            },
        });
        res.status(200).json(updatedQuestion)
    } catch (error) {
        // console.log(error)
        res.status(400).json('error in updating')
    }
}

export const points = async (req, res) => {
    try {
        const { profileData } = req.body;

        if (!profileData) {
            return res.status(400).json({ error: 'Profile data not provided' });
        }

        // Now you can access the 'profileData' and process it as needed
        // console.log('Received profile data on the server:', profileData);

        const name = profileData.result.name;


        // You can use 'name' or any other properties as needed
        let answers = await Questions.find({ $and: [{ "answer.userAnswered": name }] });
        // Send a response back to the client if needed
        res.json({ "points": answers.length * 5 }); // Replace with the actual response data
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, { $set: { noOfAnswers: noOfAnswers } })
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable..');
    }

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('Answer unavailable..');
    }

    updateNoOfQuestions(_id, noOfAnswers)
    try {
        await Questions.updateOne(
            { _id },
            { $pull: { 'answer': { _id: answerId } } }
        )
        res.status(200).json({ message: "Successfully deleted" })
    } catch (error) {
        console.log(error)
        res.status(405).json(error)
    }

}

