import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const context = {};
vm.runInNewContext(fs.readFileSync(new URL('../public/demos/budget/flow.js', import.meta.url), 'utf8'), context);
const { createConversation } = context.BudgetChat;

test('invitation requires two different questions; retries cannot unlock or duplicate answers', () => {
  const chat = createConversation();
  assert.equal(chat.invitationVisible, false);
  assert.equal(chat.ask('unknown'), false);
  assert.equal(chat.ask('summary'), true);
  assert.equal(chat.ask('summary'), false);
  assert.equal(chat.invitationVisible, false);
  assert.equal(chat.ask('overrun'), true);
  assert.equal(chat.invitationVisible, true);
  assert.deepEqual([...chat.remaining], ['email']);
  assert.equal(chat.ask('email'), true);
  assert.equal(chat.remaining.length, 0);
});

test('any two questions unlock invitation without blocking the third', () => {
  for (const order of [['email', 'summary', 'overrun'], ['overrun', 'email', 'summary']]) {
    const chat = createConversation();
    assert.equal(chat.ask(order[0]), true);
    assert.equal(chat.invitationVisible, false);
    assert.equal(chat.ask(order[1]), true);
    assert.equal(chat.invitationVisible, true);
    assert.deepEqual([...chat.remaining], [order[2]]);
    assert.equal(chat.ask(order[2]), true);
  }
});
