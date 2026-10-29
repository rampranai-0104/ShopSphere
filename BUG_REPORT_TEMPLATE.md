# Bug Hunt Arena — Official Participant Bug Report Template

Use this template to document and submit each defect you identify during the competition. Submit one report per bug found.

---

## Bug Report Submission

**Bug ID Candidate**: [e.g. BUG-01]  
**Severity**: [Critical / Major / Minor / Cosmetic]  
**Page / URL Route**: [e.g. #cart or #products]  
**Component / Feature**: [e.g. Promo Code Apply Button]  
**Date & Time of Reproduction**: [e.g. 2024-10-29 14:30]  
**Tester Name & Student ID**: [e.g. Alex Morgan / CS-2024-8841]

---

### 1. Defect Summary
*A clear, concise, single-sentence summary of the bug.*

> [Summary statement here]

---

### 2. Steps to Reproduce
*Precise step-by-step instructions so any judge or peer can replicate the exact behavior.*

1. Navigate to ...
2. Click on / Enter ...
3. Observe the behavior at ...

---

### 3. Expected Result
*What the application should have done according to standard e-commerce behavior and specifications.*

> [Expected behavior]

---

### 4. Actual Result
*What actually happened in the application.*

> [Observed defect / behavior]

---

### 5. Technical Root Cause Analysis
*Identify the underlying bug in the source code (logic error, missing validation, state desync, CSS rule, etc.).*

- **Target File**: `src/...`
- **Suspect Function / CSS Selector**: `...`
- **Technical Explanation**:

---

### 6. Suggested Code Fix
*Provide the exact code change or diff to resolve the defect.*

```javascript
// Before (Defective):
...

// After (Fixed):
...
```

---

### 7. Environment & Evidence
- **Browser & Version**: [e.g. Chrome 130.0 / Firefox 131.0]
- **Viewport Dimensions / Device**: [e.g. Desktop 1920x1080 or Mobile 390x844]
- **DevTools Evidence**:
  - Console Errors: `[Paste console trace if applicable]`
  - Network Status / URL: `[Paste failed HTTP endpoint if applicable]`
  - LocalStorage State: `[State of relevant key if applicable]`
