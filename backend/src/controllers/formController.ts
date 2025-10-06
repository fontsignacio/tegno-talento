import { Request, Response } from "express";

interface Question {
    question: string;
    answer: string;
}

export const createForm = async (req: Request, res: Response) => {

    //Seguridad
    const headerSecret = req.header('X-Webhook-Secret');
    if (headerSecret !== process.env.SHARED_SECRET) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    // Payload enviado por Apps Script
    const { formTitle, submittedAt, row, values } = req.body || {};

    const data = { formTitle, submittedAt, row, questions: [] as Question[] };
    for (const value of values) {
        for (const question of value) {
            console.log('question: ', question);
            console.log('answer: ', value[question]);
            data.questions.push({
                question: question,
                answer: value[question]
            });
        }
    }
    return res.json({ ok: true, data });
};


