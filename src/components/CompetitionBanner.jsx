import React, { useState } from 'react';
import { BugIcon, CopyIcon, CloseIcon } from './Icons';
import { useToast } from '../context/ToastContext';

export const BUG_REPORT_TEMPLATE_TEXT = `### Bug Hunt Arena — Submission Report

**Bug ID**: [e.g. BUG-01]
**Severity**: [Critical / Major / Minor]
**Page / URL Route**: [e.g. /cart]
**Component / Feature**: [e.g. Coupon Code Apply Button]

**1. Summary / Description**:
[One sentence describing what went wrong]

**2. Steps to Reproduce**:
1. Navigate to ...
2. Click on ...
3. Observe ...

**3. Expected Result**:
[What should have happened according to specs]

**4. Actual Result**:
[What actually happened in the application]

**5. Root Cause Analysis**:
[Technical explanation of the defect in code]

**6. Suggested Code Fix**:
\`\`\`javascript
// Proposed code fix here
\`\`\`

**7. Environment & Evidence**:
- Browser / Device: Chrome 130 / Desktop (or Mobile)
- DevTools Console / Network Evidence: [Logs or 404 status]
- Tester Student ID: [e.g. CS-2024-8841]
`;

export function CompetitionBanner() {
  const [showModal, setShowModal] = useState(false);
  const { addToast } = useToast();

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(BUG_REPORT_TEMPLATE_TEXT);
      addToast('Bug Report Template copied to clipboard!', 'success');
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = BUG_REPORT_TEMPLATE_TEXT;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      addToast('Bug Report Template copied to clipboard!', 'success');
    }
  };

  return (
    <>
      <div className="competition-banner">
        <div className="competition-banner-container">
          <div className="competition-badge">
            <BugIcon size={16} />
            <span>BUG HUNT ARENA</span>
          </div>
          <p className="competition-text">
            <strong>College Sprint Live Target:</strong> Find, reproduce, and document all 12 intentional bugs (BUG-01 to BUG-12).
          </p>
          <div className="competition-actions">
            <button
              onClick={handleCopyTemplate}
              className="btn btn-competition-copy"
              title="Copy markdown bug report template to clipboard"
            >
              <CopyIcon size={14} />
              <span>Copy Report Template</span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-competition-outline"
            >
              Arena Guidelines
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content competition-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-with-badge">
                <BugIcon size={20} />
                <h3>Bug Hunt Arena — Official Participant Guide</h3>
              </div>
              <button
                className="btn-icon"
                onClick={() => setShowModal(false)}
                aria-label="Close dialog"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="arena-notice-box">
                <h4>🎯 Sprint Mission</h4>
                <p>
                  ShopSphere has been deployed with exactly <strong>12 deterministic bugs</strong> labeled
                  <code>BUG-01</code> through <code>BUG-12</code>. Each bug represents a realistic front-end
                  defect spanning logic, validation, state management, cache invalidation, network requests,
                  uncaught exceptions, and responsive layout.
                </p>
              </div>

              <div className="arena-checklist">
                <h4>Participant Rules:</h4>
                <ul>
                  <li>Test every page: Home, Products, Product Details, Cart, Profile, Register, Contact.</li>
                  <li>Check Browser DevTools: Network tab, Console tab, Mobile Device Emulation.</li>
                  <li>Use the official copyable template below to submit your findings.</li>
                </ul>
              </div>

              <div className="template-preview-box">
                <div className="template-preview-header">
                  <span>BUG_REPORT_TEMPLATE.md</span>
                  <button onClick={handleCopyTemplate} className="btn btn-sm btn-primary">
                    <CopyIcon size={14} /> Copy Template
                  </button>
                </div>
                <pre className="template-code-block">{BUG_REPORT_TEMPLATE_TEXT}</pre>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary">
                Close
              </button>
              <button onClick={handleCopyTemplate} className="btn btn-primary">
                Copy Template & Start Hunting
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
