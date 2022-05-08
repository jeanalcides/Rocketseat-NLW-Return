import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2cb7f07ba42a96",
        pass: "280b0b5cda4829"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body }: SendMailData) {

        await transport.sendMail({
            from: 'Equipe Feedget <oi@fidget.com>',
            to: 'Jean Alcides <jean.ap44@gmail.com>',
            subject,
            html: body,
        });
    }
}