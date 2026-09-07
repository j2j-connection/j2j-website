globalThis.BudgetChat = (() => {
  const questions = Object.freeze([
    Object.freeze({ id: 'summary', text: 'Give me a quick summary of this budget.' }),
    Object.freeze({ id: 'overrun', text: 'Is anything over budget?' }),
    Object.freeze({ id: 'email', text: 'Draft an email asking about the overrun.' }),
  ]);
  function createConversation() {
    const answered = new Set();
    return {
      ask(id) {
        if (!questions.some(question => question.id === id) || answered.has(id)) return false;
        answered.add(id); return true;
      },
      get invitationVisible() { return answered.size >= 2; },
      get remaining() { return questions.filter(question => !answered.has(question.id)).map(question => question.id); },
    };
  }
  return Object.freeze({ questions, createConversation });
})();
