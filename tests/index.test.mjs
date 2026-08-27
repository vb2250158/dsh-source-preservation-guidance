import assert from 'node:assert/strict'
import test from 'node:test'
import { apply, SOURCE_PRESERVATION_POLICY } from '../lib/index.js'

test('preservation policy separates public plugin source from private environment data', () => {
  assert.match(SOURCE_PRESERVATION_POLICY, /open-source plugin in its own repository/)
  assert.match(SOURCE_PRESERVATION_POLICY, /public DSH extension points/)
  assert.match(SOURCE_PRESERVATION_POLICY, /separate private environment repository/)
  assert.match(SOURCE_PRESERVATION_POLICY, /personal settings, enablement, installed-plugin inventory, and plugin data/)
  assert.match(SOURCE_PRESERVATION_POLICY, /private-sync\.local\.yaml/)
})

test('appends the policy through the system-prompt waterfall and delegates', () => {
  let listener
  const ctx = {
    on(event, callback) {
      assert.equal(event, 'system-prompt/resolve')
      listener = callback
      return () => {}
    },
  }

  apply(ctx)

  let delegatedPrompt
  const result = listener('Base prompt\n', {}, prompt => {
    delegatedPrompt = prompt
    return 'resolved prompt'
  })

  assert.equal(result, 'resolved prompt')
  assert.match(delegatedPrompt, /^Base prompt\n\n/)
  assert.match(delegatedPrompt, /open-source plugin in its own repository/)
  assert.match(delegatedPrompt, /separate private environment repository/)
})
