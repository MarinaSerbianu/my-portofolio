---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/work/[slug]/page.tsx","src/app/work/page.tsx","src/app/about/page.tsx","src/app/contact/page.tsx"]
---

# Portfolio site (home, work index, case study, about, contact)

Scope: whole-site redesign. Visitor mode: Experience (the person and the work lead).
Audience: in-house hiring managers (read deeply), recruiters (skim on phones), freelance/agency clients.
Action: email / LinkedIn / CV after trusting the work.
Proof: case studies with evidence-labelled metrics; failed tests published.
Constraints: white background, few colour accents, human not AI-looking, no taped paper, sticky notes or decorative scribbles; image slots as placeholders with real text; evidence labels and factual integrity untouchable; WCAG 2.2 AA; homepage = premium independent designer, notebook concept strongest inside case studies.
Memorable moment: the hypothesis gets marked by pen once the result is known.
Unresolved: real portrait, real case studies and covers, name/contact still placeholders.

## Direction contract

THESIS: A designer's working notebook made editorial. A quiet white page where the person leads, and each case study reads as the record of an investigation (evidence, hypothesis, decision, outcome) with the pen marks left in. It refuses hero + equal card grid + numbered eyebrow sections, and refuses the cream / italic-serif / tracked-mono costume.

OWN-WORLD: White paper #FFFFFF, near-black ink, graphite secondary text. Two pens and one highlighter: ink blue for annotations, sources, links and focus; correction red only for disproved or rejected; highlighter yellow only behind verified result values. Schibsted Grotesk for display and UI, Literata for reading and blue italic margin notes. A faint 8px research grid appears only inside image slots and the hypothesis panel; placeholders carry crop-mark corners. Square corners, hairlines, no shadows, no pills. Evidence by stroke: solid underline verified, dashed directional, dotted unverified, open ring demo, red strike disproved.

STORY: Meet the person first (name, portrait slot, one-sentence stance). See the work as an index of investigations with honest outcomes, losses included. Open a case and follow evidence to hypothesis to test to result. Leave trusting the rigour; email, LinkedIn or CV.

FIRST VIEWPORT: Desktop 1440: hairline header. Columns 1-7: name in Schibsted at about 6rem, tight; under it a Literata stance sentence with one blue hand-drawn underline; a graphite discipline line; actions: ink square button "See the work" plus text link "About me". Columns 9-12: 4:5 portrait slot (grid + crop marks), its top set lower than the name, with a blue italic margin note on the career path. The first work entry's rule peeks at the fold. Mobile: name, stance, actions, then portrait.

FORM: The Working Notebook, position 3 on my ordered grounded list, assigned by the roll; seed:5cd9c6ad1518c292. Signature interaction: when a case study's hypothesis scrolls into view, its "Then" clause is marked by pen: blue underline confirmed, red strike disproved, dashed underline inconclusive; failed assumptions receive the same red strike. Motion grammar: ink draws (stroke reveal, ~700ms exponential ease-out) and the cover morph between index and case; nothing floats, bounces or fades in by default.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
