import { useState } from "react";
import { WORKERS, PRIORITY_META, STATUS_META, CATEGORY_ICONS } from "../data/workers";
import { createTicket } from "../data/ticketModel";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("All");

  function spawnTicket(worker) {
    const ticket = createTicket(worker);
    setTickets((prev) => [ticket, ...prev]);
  }

  const filtered = filter === "All"
    ? tickets
    : tickets.filter((t) => t.status === filter);

  const counts = {
    All: tickets.length,
    Open: tickets.filter((t) => t.status === "Open").length,
    "In Progress": tickets.filter((t) => t.status === "In Progress").length,
    Resolved: tickets.filter((t) => t.status === "Resolved").length,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0c10",
      color: "#e2e8f0",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Top Nav */}
      <div style={{
        background: "#0f1117",
        borderBottom: "1px solid #1e2433",
        padding: "0 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: "linear-gradient(135deg, #818cf8, #34d399)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14
          }}>🖥</div>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "#f1f5f9" }}>
            IT Helpdesk
          </span>
          <span style={{
            fontSize: 11, color: "#64748b",
            background: "#1e2433", padding: "2px 8px",
            borderRadius: 99, marginLeft: 4
          }}>
            v1.0
          </span>
        </div>
        <div style={{ fontSize: "0.75rem", color: "#475569" }}>
          Logged in as: <span style={{ color: "#818cf8" }}>IT Admin</span>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>

        {/* Sidebar */}
        <div style={{
          width: 220,
          background: "#0f1117",
          borderRight: "1px solid #1e2433",
          padding: "1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}>
          <div style={{ fontSize: "0.65rem", color: "#475569", fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            Ticket Queue
          </div>

          {["All", "Open", "In Progress", "Resolved"].map((s) => (
            <button key={s} onClick={() => setFilter(s)} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0.5rem 0.75rem", borderRadius: 6, border: "none", cursor: "pointer",
              background: filter === s ? "#1e2433" : "transparent",
              color: filter === s ? "#f1f5f9" : "#64748b",
              fontSize: "0.875rem", fontWeight: filter === s ? 600 : 400,
              transition: "all 0.15s",
            }}>
              <span>{s}</span>
              <span style={{
                background: filter === s ? "#818cf844" : "#1e2433",
                color: filter === s ? "#818cf8" : "#475569",
                borderRadius: 99, padding: "1px 7px", fontSize: 11, fontWeight: 600
              }}>
                {counts[s]}
              </span>
            </button>
          ))}

          {/* Workers */}
          <div style={{ fontSize: "0.65rem", color: "#475569", fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 24, marginBottom: 8 }}>
            Employees
          </div>

          {WORKERS.map((worker) => (
            <button key={worker.id} onClick={() => spawnTicket(worker)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "0.5rem 0.75rem", borderRadius: 6,
              border: `1px solid ${worker.color}33`,
              background: worker.color + "0a",
              cursor: "pointer", transition: "all 0.15s",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: worker.color + "22",
                border: `1.5px solid ${worker.color}66`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: worker.color, fontSize: 10, fontWeight: 700, flexShrink: 0
              }}>
                {worker.avatar}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#e2e8f0" }}>
                  {worker.name}
                </div>
                <div style={{ fontSize: "0.65rem", color: "#64748b" }}>
                  {worker.role}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "1.5rem 2rem", overflowY: "auto" }}>

          {/* Stats Row */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Total Tickets", value: counts.All, color: "#818cf8" },
              { label: "Open", value: counts.Open, color: "#ef4444" },
              { label: "In Progress", value: counts["In Progress"], color: "#818cf8" },
              { label: "Resolved", value: counts.Resolved, color: "#34d399" },
            ].map((stat) => (
              <div key={stat.label} style={{
                flex: 1, background: "#0f1117",
                border: "1px solid #1e2433", borderRadius: 8,
                padding: "1rem 1.25rem",
              }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: stat.color }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: 2 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Ticket Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr 100px 90px 90px",
            padding: "0.5rem 1rem",
            fontSize: "0.7rem", color: "#475569", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase",
            borderBottom: "1px solid #1e2433", marginBottom: "0.5rem"
          }}>
            <span>Ticket ID</span>
            <span>Subject</span>
            <span>Category</span>
            <span>Priority</span>
            <span>Status</span>
          </div>

          {/* Tickets */}
          {filtered.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "4rem",
              color: "#334155", fontSize: "0.875rem"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📭</div>
              No tickets yet — click an employee to generate one
            </div>
          ) : (
            filtered.map((ticket) => (
              <div key={ticket.id} style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr 100px 90px 90px",
                padding: "0.875rem 1rem",
                background: "#0f1117",
                border: "1px solid #1e2433",
                borderRadius: 8, marginBottom: "0.5rem",
                alignItems: "center",
                cursor: "pointer",
                transition: "border-color 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#334155"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1e2433"}
              >
                <span style={{
                  fontFamily: "monospace", fontSize: "0.75rem", color: "#818cf8"
                }}>
                  {ticket.id}
                </span>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#f1f5f9" }}>
                    {ticket.subject}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#475569", marginTop: 2 }}>
                    {ticket.workerName} · {ticket.workerRole}
                  </div>
                </div>
                <span style={{
                  fontSize: 11, color: "#64748b",
                  display: "flex", alignItems: "center", gap: 4
                }}>
                  {CATEGORY_ICONS[ticket.category]} {ticket.category}
                </span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "3px 9px", borderRadius: 99,
                  background: PRIORITY_META[ticket.priority]?.bg,
                  color: PRIORITY_META[ticket.priority]?.text,
                  fontSize: 11, fontWeight: 600,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: PRIORITY_META[ticket.priority]?.dot
                  }} />
                  {ticket.priority}
                </span>
                <span style={{
                  padding: "3px 10px", borderRadius: 99,
                  background: STATUS_META[ticket.status]?.bg,
                  color: STATUS_META[ticket.status]?.color,
                  fontSize: 11, fontWeight: 600,
                }}>
                  {ticket.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}