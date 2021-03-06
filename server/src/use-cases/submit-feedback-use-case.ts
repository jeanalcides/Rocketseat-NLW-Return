import { MailAdapter, SendMailData } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot: string;
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if(!type){
            throw new Error('Type is require')
        }

        if(!comment){
            throw new Error('Comment is require')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64'))

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                    `<div style="font-familu: sans-serif; font-size: 16px; color: #111;">`,
                    `<p>Tipo do feedback: ${type}</p>`,
                    `<p>Comentário: ${comment}</p>`,
                    `</div>`
                ].join('\n')
        })
    }
}