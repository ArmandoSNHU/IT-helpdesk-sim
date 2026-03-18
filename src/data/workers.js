export const WORKERS = [
  {
    id: "w1",
    name: "Sandra Reyes",
    role: "Accountant",
    avatar: "SR",
    color: "#818cf8",
    email: "sandra.reyes@company.internal",
    issues: [
      { subject: "QuickBooks won't open — license error on startup", category: "Software", priority: "High" },
      { subject: "Excel crashes when opening large spreadsheets", category: "Software", priority: "Medium" },
      { subject: "Can't access shared finance drive on file server", category: "Network", priority: "High" },
      { subject: "SQL report query returns wrong totals in finance DB", category: "Database", priority: "High" },
      { subject: "Stored procedure timing out on monthly close reports", category: "Database", priority: "High" },
      { subject: "VPN disconnects every 10 minutes during payroll access", category: "Network", priority: "Medium" },
    ]
  },
  {
    id: "w2",
    name: "Marcus Cole",
    role: "Sales Rep",
    avatar: "MC",
    color: "#34d399",
    email: "marcus.cole@company.internal",
    issues: [
      { subject: "Salesforce CRM loads blank pages after login", category: "Software", priority: "High" },
      { subject: "Laptop mic not working during Zoom calls", category: "Hardware", priority: "Medium" },
      { subject: "Outlook not syncing — missing 3 days of emails", category: "Email", priority: "High" },
      { subject: "CRM database shows duplicate lead records — need SQL dedup", category: "Database", priority: "Medium" },
      { subject: "Sales pipeline query in Redshift running 20+ minutes", category: "Database", priority: "High" },
      { subject: "Second monitor not detected after Windows update", category: "Hardware", priority: "Low" },
    ]
  },
  {
    id: "w3",
    name: "Priya Nambiar",
    role: "HR Manager",
    avatar: "PN",
    color: "#fb923c",
    email: "priya.nambiar@company.internal",
    issues: [
      { subject: "BambooHR login page says account is locked", category: "Access", priority: "High" },
      { subject: "Adobe crashes when opening PDF attachments", category: "Software", priority: "Medium" },
      { subject: "Calendar invites not syncing to phone", category: "Email", priority: "Low" },
      { subject: "HR database missing employee records after migration", category: "Database", priority: "High" },
      { subject: "OneDrive shows Access Denied for entire HR team", category: "Access", priority: "High" },
      { subject: "Need SQL query to pull headcount by department", category: "Database", priority: "Medium" },
    ]
  }
];

export const CATEGORY_ICONS = {
  Software: "⬡", Network: "◈", Hardware: "◉",
  Email: "◎", Database: "▣", Access: "◆"
};

export const PRIORITY_META = {
  High:   { dot: "#ef4444", bg: "rgba(239,68,68,0.12)",  text: "#fca5a5" },
  Medium: { dot: "#f59e0b", bg: "rgba(245,158,11,0.12)", text: "#fcd34d" },
  Low:    { dot: "#10b981", bg: "rgba(16,185,129,0.12)", text: "#6ee7b7" },
};

export const STATUS_META = {
  Open:          { color: "#64748b", bg: "rgba(100,116,139,0.15)" },
  "In Progress": { color: "#818cf8", bg: "rgba(129,140,248,0.15)" },
  Resolved:      { color: "#34d399", bg: "rgba(52,211,153,0.15)"  },
};