(() => {
  const { questions, createConversation } = globalThis.BudgetChat;
  const { sample, review } = globalThis.BudgetDemo;
  const chat = createConversation();
  const byId = id => document.getElementById(id);
  const production = location.protocol === 'https:' && ['j2j.info', 'www.j2j.info'].includes(location.hostname);
  // Aggregate event names only. Never send query strings, recipient IDs, or email addresses.
  function track(name) {
    if (!production) return;
    try { window.goatcounter?.count({ path: 'budget-demo-' + name, title: 'Budget demo: ' + name, event: true }); }
    catch { /* Analytics must never interrupt the walkthrough or a contact link. */ }
  }
  if (production) {
    window.goatcounter = { path: '/demos/budget/', referrer: '' };
    const analytics = document.createElement('script');
    analytics.src = 'https://gc.zgo.at/count.js';
    analytics.dataset.goatcounter = 'https://j2j.goatcounter.com/count';
    analytics.async = true;
    document.head.append(analytics);
  }
  const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  for (const row of review(sample).rows) {
    const tr = document.createElement('tr');
    const th = document.createElement('th'); th.scope = 'row'; th.textContent = row.name; tr.append(th);
    for (const value of [row.original, row.changes, row.approved, row.billed, row.remaining]) {
      const td = document.createElement('td'); td.textContent = money(value); tr.append(td);
    }
    byId('budget-rows').append(tr);
  }
  function scrollTo(element) {
    element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }
  let invitationCounted = false;
  function ask(question) {
    if (!chat.ask(question.id)) return;
    const turn = document.createElement('div'); turn.className = 'turn';
    const user = document.createElement('article'); user.className = 'message user';
    const label = document.createElement('span'); label.className = 'speaker'; label.textContent = 'YOU';
    const text = document.createElement('p'); text.textContent = question.text; user.append(label, text);
    const answer = document.createElement('article'); answer.className = 'message assistant';
    const speaker = document.createElement('span'); speaker.className = 'speaker'; speaker.textContent = 'J2J DEMO';
    answer.append(speaker, byId('answer-' + question.id).content.cloneNode(true));
    turn.append(user, answer); byId('messages').append(turn);
    byId('question-' + question.id).hidden = true;
    byId('invitation').hidden = !chat.invitationVisible;
    const remaining = chat.remaining;
    byId('question-label').textContent = remaining.length === 1 ? 'TRY THE LAST QUESTION' : 'TRY ANOTHER QUESTION';
    byId('question-label').hidden = remaining.length === 0;
    byId('finished').hidden = remaining.length !== 0;
    track('question-' + question.id);
    if (chat.invitationVisible && !invitationCounted) { track('invitation-shown'); invitationCounted = true; }
    (remaining.length ? byId('question-' + remaining[0]) : byId('book')).focus({ preventScroll: true });
    scrollTo(user);
  }
  for (const question of questions) {
    const button = document.createElement('button');
    button.type = 'button'; button.id = 'question-' + question.id; button.className = 'question-button';
    button.textContent = question.text;
    button.addEventListener('click', () => ask(question));
    byId('questions').append(button);
  }
  byId('messages').addEventListener('click', async event => {
    if (event.target.closest('.source-link')) {
      byId('spreadsheet').open = true;
      byId('spreadsheet').querySelector('summary').focus({ preventScroll: true });
      scrollTo(byId('spreadsheet')); track('source-view');
    }
    const button = event.target.closest('.copy-draft');
    if (!button) return;
    const answer = button.closest('.assistant');
    const status = answer.querySelector('.copy-status');
    const draft = answer.querySelector('.draft-subject').textContent + '\n\n' + answer.querySelector('.draft-body').textContent;
    try {
      await navigator.clipboard.writeText(draft);
      status.textContent = 'Copied. Review before sending.'; track('draft-copied');
    } catch { status.textContent = 'Select the draft above and copy it manually.'; }
  });
  byId('book').addEventListener('click', () => track('booking-click'));
  byId('email-us').addEventListener('click', () => track('email-click'));
  byId('download').addEventListener('click', () => track('workbook-download'));
})();
