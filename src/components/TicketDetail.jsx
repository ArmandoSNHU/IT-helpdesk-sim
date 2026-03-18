import { useState } from "react";
import { PRIORITY_META, STATUS_META, CATEGORY_ICONS } from "../data/workers";

export default function TicketDetail({ ticket, onBack, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(ticket.notes || "");

  async function loadSteps() {
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1000,
          system: `You are a senior IT helpdesk engineer. Return ONLY a JSON array, no markdown, no explanation.
Each object: {"step":number,"title":"string","action":"string","verify":"string","isCheckpoint":boolean}
4-6 steps total. isCheckpoint=true means this step verifies the fix worked.
For Database/SQL tickets include specific SQL diagnostic queries in the action field.`,
          messages: [{
            role: "user",
            content: `Ticket: "${ticket.subject}" | Category: ${ticket.category} | Reporter: ${ticket.workerRole}`
          }]
        })
      });
      const data = await res.json();
      console.log("API Response:", JSON.stringify(data, null, 2));
      if (data.error) {
        console.error("API Error:", data.error);
        throw new Error(data.error.message);
      }
      const text = data.content?.find(b => b.type === "text")?.text || "[]";
      const steps = JSON.parse(text.replace(/```json|```/g, "").trim());
      onUpdate({ ...ticket, steps, status: "In Progress", currentStep: 0 });
    } catch (err) {
      console.error("loadSteps error:", err);
      onUpdate({
        ...ticket,
        status: "In Progress",
        currentStep: 0,
        steps: [
          { step: 1, title: "Reproduce Issue", action: "Ask the user to demonstrate the problem or provide screenshots.", verify: "Issue is confirmed and documented.", isCheckpoint: false },
          { step: 2, title: "Restart & Clear Cache", action: "Restart the affected app and clear temp files.", verify: "Check if issue persists after restart.", isCheckpoint: true },
          { step: 3, title: "Inspect Logs", action: "Review application and system event logs for error codes.", verify: "Error identified in logs.", isCheckpoint: false },
          { step: 4, title: "Apply Fix", action: "Apply the appropriate resolution based on findings.", verify: "User confirms issue is fully resolved.", isCheckpoint: true },
        ]
      });
    }
    setLoading(false);
  }

  function completeStep() {
    const next = ticket.currentStep + 1;
    if (next >= ticket.steps.length) {
      onUpdate({ ...ticket, currentStep: next, status: "Resolved", resolvedAt: new Date(), notes });
    } else {
      onUpdate({ ...ticket, currentStep: next, notes });
    }
  }

  function saveNotes() {
    onUpdate({ ...ticket, notes });
  }

  const pm = PRIORITY_META[ticket.priority];
  const sm = STATUS_META[ticket.status];

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0c10",
      color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif",
      padding: "2rem", maxWidth: 800, margin: "0 auto"
    }}>

      {/* Back */}
      <button onClick={onBack} style={{
        background: "none", border: "none", color: "#475569",
        cursor: "pointer", fontSize: "0.875rem", marginBottom: "1.5rem",
        display: "flex", alignItems: "center", gap: 6, padding: 0
      }}>
        ← Back to Dashboard
      </button>

      {/* Ticket Header */}
      <div style={{
        background: "#0f1117", border: "1px solid #1e2433",
        borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: "#334155", fontFamily: "monospace" }}>
                {ticket.id}
              </span>
              <span style={{
                padding: "1px 7px", borderRadius: 4,
                background: "rgba(100,116,139,0.1)", color: "#64748b", fontSize: 11
              }}>
                {CATEGORY_ICONS[ticket.category]} {ticket.category}
              </span>
            </div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f1f5f9", marginBottom: 8 }}>
              {ticket.subject}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: ticket.workerColor + "18",
                border: `1.5px solid ${ticket.workerColor}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: ticket.workerColor, fontWeight: 700, fontSize: 9
              }}>
                {ticket.workerAvatar}
              </div>
              <span style={{ fontSize: "0.8rem", color: "#475569" }}>
                {ticket.workerName} · {ticket.workerRole}
              </span>
              <span style={{ fontSize: "0.8rem", color: "#334155" }}>
                {new Date(ticket.created).toLocaleString()}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "3px 10px", borderRadius: 99,
              background: pm.bg, color: pm.text, fontSize: 11, fontWeight: 600
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: pm.dot }} />
              {ticket.priority}
            </span>
            <span style={{
              padding: "3px 10px", borderRadius: 99,
              background: sm.bg, color: sm.color, fontSize: 11, fontWeight: 600
            }}>
              {ticket.status}
            </span>
          </div>
        </div>
      </div>

      {/* Troubleshooting Steps */}
      <div style={{
        background: "#0f1117", border: "1px solid #1e2433",
        borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#94a3b8" }}>
            🔧 Troubleshooting Steps
          </h3>
          {ticket.steps.length === 0 && (
            <button onClick={loadSteps} disabled={loading} style={{
              padding: "6px 14px", borderRadius: 8,
              background: loading ? "#1e2433" : "#818cf8",
              color: loading ? "#475569" : "#fff",
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              fontSize: "0.8rem", fontWeight: 600
            }}>
              {loading ? "⏳ Generating..." : "⚡ Get AI Steps"}
            </button>
          )}
        </div>

        {ticket.steps.length === 0 && !loading && (
          <div style={{ color: "#334155", fontSize: "0.875rem", textAlign: "center", padding: "2rem" }}>
            Click "Get AI Steps" to generate troubleshooting steps for this ticket
          </div>
        )}

        {loading && (
          <div style={{ color: "#818cf8", fontSize: "0.875rem", textAlign: "center", padding: "2rem" }}>
            ⚡ Generating AI troubleshooting steps...
          </div>
        )}

        {ticket.steps.map((step, i) => {
          const isDone = i < ticket.currentStep;
          const isCurrent = i === ticket.currentStep && ticket.status !== "Resolved";
          return (
            <div key={i} style={{
              display: "flex", gap: 12, marginBottom: 12,
              opacity: isDone ? 0.5 : 1
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: isDone ? "rgba(52,211,153,0.15)" : isCurrent ? "rgba(129,140,248,0.15)" : "#1e2433",
                border: `1.5px solid ${isDone ? "#34d399" : isCurrent ? "#818cf8" : "#334155"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700,
                color: isDone ? "#34d399" : isCurrent ? "#818cf8" : "#475569"
              }}>
                {isDone ? "✓" : step.step}
              </div>
              <div style={{
                flex: 1,
                background: isCurrent ? "rgba(129,140,248,0.05)" : "transparent",
                border: isCurrent ? "1px solid #818cf822" : "1px solid transparent",
                borderRadius: 8, padding: isCurrent ? "0.75rem" : "0.25rem 0"
              }}>
                <div style={{ fontWeight: 600, fontSize: "0.85rem", color: isCurrent ? "#c7d2fe" : "#94a3b8", marginBottom: 4 }}>
                  {step.title}
                  {step.isCheckpoint && (
                    <span style={{ marginLeft: 6, fontSize: 10, color: "#f59e0b" }}>✦ checkpoint</span>
                  )}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: isCurrent ? 6 : 0 }}>
                  {step.action}
                </div>
                {isCurrent && (
                  <>
                    <div style={{ fontSize: "0.75rem", color: "#475569", marginBottom: 10 }}>
                      ✓ Verify: {step.verify}
                    </div>
                    <button onClick={completeStep} style={{
                      padding: "5px 14px", borderRadius: 6,
                      background: "rgba(129,140,248,0.2)",
                      color: "#818cf8", border: "1px solid #818cf833",
                      cursor: "pointer", fontSize: "0.8rem", fontWeight: 600
                    }}>
                      Mark Complete →
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {ticket.status === "Resolved" && (
          <div style={{
            textAlign: "center", padding: "1rem",
            color: "#34d399", fontSize: "0.875rem", fontWeight: 600
          }}>
            ✅ Ticket Resolved · {ticket.resolvedAt ? new Date(ticket.resolvedAt).toLocaleString() : ""}
          </div>
        )}
      </div>

      {/* Notes */}
      <div style={{
        background: "#0f1117", border: "1px solid #1e2433",
        borderRadius: 12, padding: "1.5rem"
      }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#94a3b8", marginBottom: "0.75rem" }}>
          📝 Technician Notes
        </h3>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Add resolution notes, steps taken, or follow-up actions..."
          style={{
            width: "100%", minHeight: 100,
            background: "#0a0c10", border: "1px solid #1e2433",
            borderRadius: 8, padding: "0.75rem",
            color: "#e2e8f0", fontSize: "0.85rem",
            resize: "vertical", outline: "none", fontFamily: "inherit"
          }}
        />
        <button onClick={saveNotes} style={{
          marginTop: 8, padding: "6px 16px", borderRadius: 6,
          background: "rgba(52,211,153,0.15)", color: "#34d399",
          border: "1px solid #34d39933", cursor: "pointer",
          fontSize: "0.8rem", fontWeight: 600
        }}>
          Save Notes
        </button>
      </div>
    </div>
  );
}