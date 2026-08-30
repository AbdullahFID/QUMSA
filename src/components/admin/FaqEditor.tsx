'use client'

import { HelpCircle, Plus } from 'lucide-react'
import { useContentFile } from './useContentFile'
import {
  Field, TextInput, TextArea, Btn, GlassCard,
  ListControls, arrayMove, SaveBar, LoadingPane, ErrorPane,
} from './ui'

type Faq = { q: string; a: string }
type FaqContent = { faqs: Faq[] }

export default function FaqEditor() {
  const { content, update, save, loading, error, dirty, saving, published } =
    useContentFile<FaqContent>('faq')

  if (loading) return <LoadingPane />
  if (!content) return <ErrorPane message={error || 'Could not load FAQs'} />

  const setFaq = (i: number, patch: Partial<Faq>) =>
    update((c) => ({ ...c, faqs: c.faqs.map((f, j) => (j === i ? { ...f, ...patch } : f)) }))

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" /> FAQ
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            The questions and answers on the /resources/faq page, shown in this order.
          </p>
        </div>
        <Btn variant="gold" onClick={() => update((c) => ({ ...c, faqs: [...c.faqs, { q: '', a: '' }] }))}>
          <Plus className="w-4 h-4" /> Add question
        </Btn>
      </div>

      <div className="space-y-4">
        {content.faqs.map((faq, i) => (
          <GlassCard key={i}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <span className="font-semibold text-white truncate">{faq.q || 'New question'}</span>
              <ListControls
                onUp={i > 0 ? () => update((c) => ({ ...c, faqs: arrayMove(c.faqs, i, i - 1) })) : undefined}
                onDown={i < content.faqs.length - 1 ? () => update((c) => ({ ...c, faqs: arrayMove(c.faqs, i, i + 1) })) : undefined}
                onDelete={() => update((c) => ({ ...c, faqs: c.faqs.filter((_, j) => j !== i) }))}
              />
            </div>
            <div className="space-y-4">
              <Field label="Question">
                <TextInput value={faq.q} onChange={(e) => setFaq(i, { q: e.target.value })} placeholder="Is there a membership fee?" />
              </Field>
              <Field label="Answer">
                <TextArea rows={3} value={faq.a} onChange={(e) => setFaq(i, { a: e.target.value })} />
              </Field>
            </div>
          </GlassCard>
        ))}
      </div>

      <SaveBar dirty={dirty} saving={saving} published={published} error={error} onSave={save} />
    </div>
  )
}
