import { test, expect } from '@playwright/test';

test('should submit a job', async ({ request }) => {
  const submit_job = await request.post(`/api/submit_job`, {
    data: {
      messages: [
        {
          who: 'bot',
          message:
            'Hi! I read your book, parsed it with LangChain and Steamship. Ask me a question!',
        },
      ],
      user: 'u1vuzn',
    },
    timeout: 0, // Disable timeout
  });
  expect(submit_job.ok()).toBeTruthy();
});

test('should check a job', async ({ request }) => {
  // test('should create a feature request', async ({ request }) => {
  //   const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
  //     data: {
  //       title: '[Feature] request 1',
  //       body: 'Feature description',
  //     },
  //   });
  //   expect(newIssue.ok()).toBeTruthy();
  //   const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
  //   expect(issues.ok()).toBeTruthy();
  //   expect(await issues.json()).toContainEqual(
  //     expect.objectContaining({
  //       title: '[Feature] request 1',
  //       body: 'Feature description',
  //     })
  //   );
  // });
});
