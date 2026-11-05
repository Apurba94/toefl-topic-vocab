/* Topic Vocabulary: words for campus life and the academic subjects TOEFL draws on. */
(function () {
  'use strict';
  const words = (ctx) => ctx.data.topic_words.map((x) => ({ id: x.id, w: x.w, d: x.d, tag: x.topic, pos: x.topic, e: '' }));
  const App = {
    about: 'TOEFL passages and lectures come from a set of familiar subjects: campus life, biology, earth science, history, art and literature, economics, psychology and astronomy. This app teaches 83 core words across those eight topics, so a lecture on glaciers or a notice about tuition never starts with a wall of unknown words.',
    how: ['Pick a topic in **Cards** and learn its words.', 'Quiz yourself by topic in **Quiz**.', 'Before a practice listening, review the words for its subject.'],
    tabs: [
      SK.cardsTab('cards', 'Cards', (ctx) => words(ctx).map((w) => ({ id: w.id, front: w.w, back: w.d, tag: w.tag, say: w.w }))),
      SK.wordQuizTab('quiz', 'Quiz', words, ['meaning', 'word']),
    ],
    checks: { 'every topic has enough words for a quiz': (data, assert) => {
      const topics = {}; data.topic_words.forEach((x) => { topics[x.topic] = (topics[x.topic] || 0) + 1; });
      assert.equal(Object.keys(topics).length, 8);
      for (const [t, n] of Object.entries(topics)) assert.ok(n >= 8, t);
      for (let s = 1; s < 10; s++) for (const it of SK.wordItems(data.topic_words.map((x) => ({ id: x.id, w: x.w, d: x.d, pos: x.topic })), 20, s, ['meaning', 'word'])) assert.deepEqual(SK.validateItem(it), []);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
