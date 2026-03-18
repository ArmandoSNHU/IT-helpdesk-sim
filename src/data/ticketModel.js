let ticketSeed = 1000;

export function createTicket(worker, issueOverride) {
  const issue = issueOverride ||
    worker.issues[Math.floor(Math.random() * worker.issues.length)];

  return {
    id: `TKT-${++ticketSeed}`,
    workerId: worker.id,
    workerName: worker.name,
    workerRole: worker.role,
    workerAvatar: worker.avatar,
    workerColor: worker.color,
    workerEmail: worker.email,
    subject: issue.subject,
    category: issue.category,
    priority: issue.priority,
    status: "Open",
    created: new Date(),
    steps: [],
    currentStep: 0,
    notes: "",
    resolvedAt: null,
    gmailStatus: "pending",
  };
}