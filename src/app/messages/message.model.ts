export class Message {
    messageId: string;
    subject: string;
    msgText: string;
    sender: string;

    constructor(messageId: string, subject: string, msgText: string, sender: string) {
        this.messageId = messageId;
        this.subject = subject;
        this.msgText = msgText;
        this.sender = sender;
    }
}