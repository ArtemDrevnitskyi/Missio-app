import type { Task } from '@steamship/client';
import { getSteamshipPackage } from '@steamship/steamship-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface Messages {
  messages: Message[];
}

export interface Message {
  who: 'bot' | 'user';
  message: string;
}

export interface TaskHandler {
  taskId: string;
  workspace: string;
}

export interface TaskHandlerError {
  error: string;
}

export interface ErrorResponse {
  response?: {
    data?: {
      status?: {
        statusMessage?: string;
      };
    };
  };
}

// This function is called when the user submits a message to the chatbot.
// It takes the message and sends it to the Steamship backend.
// The Steamship backend will process the message and send back a response.
// We return the taskId and workspace name so we can poll for the result.
// Note: We use invokeAsync so we can return the taskId and respond to the user immediately.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TaskHandler | TaskHandlerError>
) {
  const { messages } = req.body as Messages;

  if (!messages) {
    return res.json({ error: 'Please enter a message.' });
  }

  const { message } = messages[messages.length - 1];

  if (!message) {
    return res.json({ error: 'No last message found.' });
  }

  try {
    // Fetch a stub to the Steamship-hosted backend.
    // Use a different workspace name per-user to provide data isolation.
    const uniqueUserToken = 'user-1234';
    const packageHandle = process.env.STEAMSHIP_PACKAGE_HANDLE as string;
    const workspace = `${packageHandle}-${uniqueUserToken}`;

    const pkg = await getSteamshipPackage({
      workspace,
      pkg: packageHandle,
    });

    // Invoke a method on the package defined in steamship/api.py. Full syntax: pkg.invoke("method", {args}, "POST" | "GET")
    // Since we use invokeAsync here, the result will be a task that we can poll. This guarantees the Vercel function
    // can return quickly without having the paid plan.
    const resp: Task<TaskHandler> = await pkg.invokeAsync('send_message', {
      message,
      chat_history_handle: 'default', // Note: the bundled chat package provides different chat "rooms" with a workspace.
    });

    const { taskId } = resp;

    if (!taskId) {
      return res.json({ error: 'No taskId was returned from Steamship' });
    }
    return res.json({ taskId, workspace });
  } catch (ex) {
    const awaitedEx = (await ex) as ErrorResponse;

    if (awaitedEx?.response?.data?.status?.statusMessage) {
      return res.json({
        error: awaitedEx?.response?.data?.status?.statusMessage,
      });
    }

    return res.json({
      error: `There was an error responding to your message.`,
    });
  }
}
