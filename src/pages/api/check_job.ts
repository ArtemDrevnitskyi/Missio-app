import { getTask } from '@steamship/steamship-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface TaskResult {
  taskId: string;
  output?: string;
  state: string;
  statusMessage?: string;
}

export interface TaskHandler {
  taskId: string;
  workspace: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TaskResult>
) {
  const { taskId, workspace } = req.body as TaskHandler;
  return res.json(await getTask({ taskId, workspace }));
}
