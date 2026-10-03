const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'styles', 'main.css');
let content = fs.readFileSync(filePath, 'utf8');

// Ensure case-badge-btn has max-width
if (!content.includes('max-width: 150px;')) {
  content = content.replace(
    '  flex-shrink: 0;\r\n}',
    '  flex-shrink: 0;\r\n  max-width: 150px;\r\n}'
  );
  if (!content.includes('max-width: 150px;')) {
    content = content.replace(
      '  flex-shrink: 0;\n}',
      '  flex-shrink: 0;\n  max-width: 150px;\n}'
    );
  }
}

// Add Case Board Styles at end
const caseBoardCss = `

/* ==========================================================================
   MULTI-CASE DOSSIER & MASTER INVESTIGATION BOARD STYLES
   ========================================================================== */
.case-board-modal-window {
  max-width: 880px !important;
  width: 94%;
}

.case-board-tab-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(10, 12, 18, 0.95);
  border-bottom: 1px solid var(--border-subtle);
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.case-board-tab-bar::-webkit-scrollbar {
  display: none;
}

.case-tab-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  letter-spacing: 0.5px;
}

.case-tab-btn:hover {
  background: rgba(212, 175, 55, 0.12);
  color: #fff;
  border-color: rgba(212, 175, 55, 0.4);
}

.case-tab-btn.active {
  background: rgba(212, 175, 55, 0.2);
  border-color: var(--gold-accent);
  color: #fff;
  box-shadow: 0 0 12px rgba(212, 175, 55, 0.25);
  font-weight: 700;
}

.case-tab-btn.master-tab {
  border-color: rgba(212, 175, 55, 0.5);
  color: var(--gold-accent);
}
.case-tab-btn.master-tab.active {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(139, 30, 34, 0.3));
  border-color: var(--gold-accent);
  color: #fff;
  box-shadow: 0 0 16px rgba(212, 175, 55, 0.4);
}

.case-board-modal-body {
  padding: clamp(14px, 2vh, 24px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Active Case Hero Banner */
.case-dossier-hero {
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 6px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
}

.case-hero-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.case-hero-code {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--gold-accent);
  background: rgba(212, 175, 55, 0.12);
  padding: 2px 8px;
  border-radius: 3px;
  border: 1px solid rgba(212, 175, 55, 0.3);
}

.case-hero-code.gold {
  color: #fff;
  background: linear-gradient(135deg, #d4af37, #996515);
  border-color: #ffd700;
}

.case-hero-status {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.case-hero-status.active {
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.5);
  color: #fbbf24;
}

.case-hero-status.solved {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.5);
  color: #34d399;
}

.case-hero-status.master {
  background: rgba(168, 85, 247, 0.25);
  border: 1px solid rgba(168, 85, 247, 0.6);
  color: #c084fc;
}

.case-hero-title {
  font-family: var(--font-heading);
  font-size: clamp(1.05rem, 1.4vw, 1.3rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  margin: 0;
}

.case-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
}

.case-hero-summary {
  font-family: var(--font-body);
  font-size: 0.88rem;
  line-height: 1.5;
  color: #ded7cb;
  margin: 4px 0 0 0;
}

.case-hero-progress {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Case Evidence Section */
.case-evidence-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.case-section-heading {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--gold-accent);
  text-transform: uppercase;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  padding-bottom: 4px;
}

.case-clues-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
}

.case-evidence-card {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(224, 215, 199, 0.12);
  border-radius: 4px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s ease;
}

.case-evidence-card:hover {
  border-color: rgba(212, 175, 55, 0.4);
  background: rgba(212, 175, 55, 0.05);
}

.evidence-card-title {
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 700;
  color: #fff;
}

.evidence-card-desc {
  font-family: var(--font-body);
  font-size: 0.78rem;
  line-height: 1.4;
  color: var(--text-secondary);
}

.case-empty-notice {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.85rem;
  padding: 12px;
  text-align: center;
  grid-column: 1 / -1;
}

/* Solved Cases Archive */
.solved-archive-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.archive-intro-box {
  background: rgba(0, 0, 0, 0.3);
  border-left: 3px solid var(--gold-accent);
  padding: 10px 16px;
  border-radius: 0 4px 4px 0;
}
.archive-intro-box span {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--gold-accent);
}
.archive-intro-box p {
  font-family: var(--font-body);
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--text-secondary);
  margin: 4px 0 0 0;
}

.solved-cases-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.solved-case-dossier-card {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 6px;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.solved-case-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.solved-case-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.solved-case-summary {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.45;
  color: #d8d2c6;
  margin: 2px 0 0 0;
}

.solved-case-keystone {
  margin-top: 6px;
  padding: 8px 12px;
  background: rgba(212, 175, 55, 0.08);
  border: 1px dashed rgba(212, 175, 55, 0.3);
  border-radius: 4px;
}
.keystone-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.keystone-name {
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--gold-accent);
  margin: 2px 0;
}
.keystone-desc {
  font-family: var(--font-body);
  font-size: 0.78rem;
  line-height: 1.35;
  color: var(--text-secondary);
}

/* Master Case & Keystone Web */
.master-case-hero {
  background: linear-gradient(135deg, rgba(20, 16, 28, 0.95), rgba(40, 28, 12, 0.9));
  border: 1.5px solid var(--gold-accent);
  border-radius: 6px;
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 0 24px rgba(212, 175, 55, 0.25);
}

.master-hero-title {
  font-family: var(--font-heading);
  font-size: clamp(1.15rem, 1.6vw, 1.45rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.8px;
  margin: 0;
}

.master-hero-summary {
  font-family: var(--font-body);
  font-size: 0.88rem;
  line-height: 1.55;
  color: #e8e2d5;
  margin: 4px 0 0 0;
}

.master-keystone-network {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.keystone-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
}

.keystone-node {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s ease;
}

.keystone-node.secured {
  border: 1px solid rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.05);
}

.keystone-node.pending {
  border: 1px dashed rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.04);
}

.keystone-node-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.keystone-source-code {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text-muted);
}

.keystone-status-badge {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 2px;
  letter-spacing: 0.5px;
}
.keystone-status-badge.secured {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}
.keystone-status-badge.pending {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
}

.keystone-node-title {
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 700;
  color: #fff;
}

.keystone-node-info {
  font-family: var(--font-body);
  font-size: 0.76rem;
  line-height: 1.35;
  color: var(--text-secondary);
}

.master-action-box {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.master-synthesis-hint {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.4;
}
`;

if (!content.includes('case-board-modal-window')) {
  content += caseBoardCss;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated main.css with Case Board & Master Case styles!');
