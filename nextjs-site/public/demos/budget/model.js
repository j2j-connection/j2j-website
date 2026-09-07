/* Fictional teaching data, authored for this worked example. No client records. */
globalThis.BudgetDemo = (() => {
  const sample = Object.freeze([
    Object.freeze({ id: 'architecture', name: 'Architectural design', original: 80000, changes: 10000, billed: 99000 }),
    Object.freeze({ id: 'interiors', name: 'Interior design', original: 120000, changes: 15000, billed: 90000 }),
    Object.freeze({ id: 'lighting', name: 'Lighting design', original: 30000, changes: 0, billed: 27000 }),
    Object.freeze({ id: 'landscape', name: 'Landscape design', original: 45000, changes: 0, billed: 18000 }),
  ]);
  function review(input) {
    if (!Array.isArray(input) || !input.length) throw new Error('Budget rows are required.');
    const ids = new Set();
    const rows = input.map(row => {
      if (!row.id || ids.has(row.id)) throw new Error('Budget rows need unique identifiers.');
      ids.add(row.id);
      for (const key of ['original', 'changes', 'billed']) {
        if (!Number.isFinite(row[key])) throw new Error(`Missing or invalid ${key}.`);
      }
      const approved = row.original + row.changes;
      const remaining = approved - row.billed;
      return { ...row, approved, remaining, overrun: Math.max(0, -remaining) };
    });
    const approved = rows.reduce((sum, row) => sum + row.approved, 0);
    const billed = rows.reduce((sum, row) => sum + row.billed, 0);
    return { rows, approved, billed, remaining: approved - billed,
      billedRatio: approved > 0 ? billed / approved : null, overruns: rows.filter(row => row.overrun > 0) };
  }
  return Object.freeze({ sample, review });
})();
