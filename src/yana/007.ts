import { Express } from "express";

interface CommandStrategy {
    execute(...args: any): Promise<any>;
}

class GetRequestStrategy implements CommandStrategy {
    execute(id: string): Promise<any> {
        const command = new GetCommand();
        return command.do(id);
    }
}

class DeleteRequestStrategy implements CommandStrategy {
    execute(id: string): Promise<any> {
        const command = new DeleteCommand();
        return command.do(id);
    }
}

abstract class RequestHandler {
    protected nextHandler? : RequestHandler;

    setNext(handler : RequestHandler) {
        this.nextHandler = handler;
        return handler;
    }

    continue(request: Request, response: Response) {
        if (this.nextHandler != null) {
            return this.nextHandler.handleRequest(request, response);
        }
        return Promise.resolve();
    }

    abstract handleRequest(request: Request ,response: Response): Promise<void>
}