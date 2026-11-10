---
title: "Evaluating the Jazz Transformer: Surprise, Risk, and Human Practice"
date: "2026-11-10"
---

The Jazz Transformer (Wu & Yang, ISMIR 2020) is a Transformer-XL trained to generate jazz solos as sequences of events: bars, positions, chords, pitches, durations. Training and evaluation are largely based on fit to the dataset distribution, with rigid definitions of "correctness". There are no metrics implemented to evaluate the creativity of generated compositions, so we leverage information theory and the interplay of human surprise and uncertainty to quantify risk. Ultimately, we are curious about whether a generated solo *takes risks* the way a human improviser does.

This research asks a narrow question: when a model takes a risk, how justified is that risk in the context of jazz?

The short version: at sampling temperature $T = 1.2$, generated solos take risks at a slightly lower rate than human players, but continue after them and fit them to the chords in a human way. Raising the temperature changes how many risks the model takes much more than how it handles them.

---

# Setup

All results use the pretrained checkpoint `jazz-trsfmr-B-loss0.25`: a 12-layer Transformer-XL ($d_{\text{model}} = 512$, 8 heads, 41M parameters) over a vocabulary of 469 event ids, with 64 positions per 4/4 bar.

| Item | Detail |
| --- | --- |
| Human corpus | Weimar Jazz Database (WJazzD), 431 solos in 4/4; 409 used to train the judges, 22 held out |
| Generated set | 10 solos of 32 bars at temperature 1.2 |

Everything measured by the "judges" below is in bits per note.

---

# Judging surprise with Markov models

To talk about risk-taking, we need an outside model of what's *expected* in a jazz line. We used smoothed Markov "judges" from the PPM/IDyOM family, which predict each note's melodic interval (pitch minus previous pitch, in semitones). They're trained on the 409 WJazzD training songs: 178,018 notes and 74 distinct intervals.

Contexts $c_0, \dots, c_m$ run from most to least specific. Starting from a uniform floor over $V + 1$ outcomes (the extra slot covers unseen intervals), each level seen in training is mixed in:

$$
P_{\text{floor}}(w) = \frac{1}{V+1}, \qquad P_k(w) = \frac{\mathrm{count}(c_k, w) + T(c_k)\,P_{k+1}(w)}{N(c_k) + T(c_k)}
$$

where $T(c)$ is the number of distinct intervals seen after context $c$ and $N(c)$ is its total count. For each note, the information content is $IC = -\log_2 P(\text{actual interval})$ and $H$ is the entropy of the predicted distribution.

There are four judges:

| Judge | Context | Role |
| --- | --- | --- |
| A, melody-only | Previous 2 intervals, backing off | Expectation from melodic habit |
| H, harmony-only | (previous note's chord degree, chord quality, beat) | Expectation from harmony and meter |
| B, chord-aware | Geometric mix of A and H | The main risk judge |
| S, short-term | A's chain at order 3, counts reset for each solo | Predictability from the solo's own material |

Judge B combines the melody and harmony judges the way IDyOM combines viewpoints:

$$
P_B(x) \propto P_A(x)^{1-w} \, P_H(x)^{w}
$$

The weight $w$ is fitted by maximum held-out likelihood over 5 cross-validation folds grouped by artist, so no artist is in both the fitting and the scoring set. The likelihood curve has a clean interior minimum at $w = 0.38$, and every mix between 0.1 and 0.7 beats both pure models.

| Judge | Real solos, IC (bits) | Generated solos, IC (bits) |
| --- | --- | --- |
| A, melody-only | 3.36 | 3.44 |
| H, harmony-only | 3.50 | 3.43 |
| B, chord-aware | 3.29 | 3.31 |
| S, short-term | 4.07 | 4.40 |

Two things stand out. Generated solos are about as typical as real ones note to note (A: 3.44 vs 3.36). But they're 0.33 bits *less* predictable from their own material (S), which means the model reuses its own motifs less than human players do. Harmony also matters more for the generated solos: harmony-only H actually beats melody-only A on them, but not on real solos, so the model's lines follow the chords more closely than real players' lines do.

---

# Risk, and whether it's handled like a human

A note is surprising when it carries more information than the judge expected:

$$
\text{risk} = IC_B - H_B
$$

A note is a **risk event** when its risk exceeds $\tau_{\text{risk}}$, the 95th percentile of risk on cross-validated human data (3.13 bits).

Surprise alone doesn't say whether a risk *worked*. In jazz, an outside note is justified by what comes next: a line that steps into a chord tone makes the risk sound intentional. So we built a retrospective judge $R$ that also sees the next two notes. A future-aware model $F$ predicts the same interval from the previous interval, the span to the next note, the next note's chord degree, and the span after that. $R$ combines $F$ with $B$ the same way $B$ combines $A$ and $H$:

$$
P_R(x) \propto P_B(x)^{1-v} \, P_F(x)^{v}, \qquad J = IC_B - IC_R
$$

$J$ is the number of bits of the note's surprise that its continuation explains: the pointwise mutual information between the note and what follows, given the past. At $v = 0$, $R = B$ and $J = 0$. Fitting $v$ the same way gives $v = 0.52$. $J$ is positive when the line steps to a chord tone and negative before a leap.

Alongside $J$, **chord fit** scores how well the risk note and its next two notes sit on the harmony:

$$
\text{fit}_{\text{win}} = \sum_{i=0}^{2} \left[ \log_2 P(\text{degree}_i \mid \text{chord type}_i) + \log_2 12 \right]
$$

That's the number of bits each note's degree gains over a harmony-blind, uniform pitch class. Over a dominant seventh, for example, the root scores +0.77 bits and the major 7th scores −0.97. On human risks, $J$ and chord fit are uncorrelated ($r = 0.01$), so they're kept as separate measures.

Neither score needs labels. Both are calibrated on held-out human risk events (8,860 of them), and a risk is **flagged** when it falls below the human 5th percentile. By construction, 5% of human risks get flagged, which makes "human practice" the reference point. A set of solos is then compared with humans by AUC, where 0.5 means indistinguishable.

So each set of solos gets three numbers: how many risks it takes (surprise), how it continues after them ($J$), and how well they fit the chords (chord fit).

# Results

At $T = 1.2$ the transformer is close to human practice on all three:

| Measure | Human (22 held-out WJazzD solos) | Generated |
| --- | --- | --- |
| Risk events per 100 notes | 4.4 | 3.8 |
| $J$: flagged at 5% false-alarm rate | 4.7% | 1.9% |
| $J$: AUC against human risks | 0.51 | 0.52 |
| Chord fit: flagged | 3.5% | 2.9% |
| Chord fit: AUC against human risks | 0.48 | 0.46 |

The model takes slightly fewer risks, continues after them like a human, and fits the chords at least as well. With only 105 generated risk events, none of these gaps is meaningful.

# Rationalizing the judge models

We validated the measures by damaging held-out human solos in ways with known answers and checking whether the scores catch the damage. Each corrupted set is compared with human risks of the *same surprise*, so surprise alone scores AUC 0.50 by design and only what $J$ or chord fit adds can separate them.

| Corruption | $J$ AUC | Chord-fit AUC |
| --- | --- | --- |
| Wrong note (non-chord tone not resolved by step) | 0.82 | 0.71 |
| Continuation swapped in from another solo, ignoring the risk note | 0.84 | 0.66 |
| Continuation swapped in, moving on from the risk note but ignoring the harmony | 0.44 | 0.64 |
| Planted resolution (control, should look human) | 0.52 | 0.55 |

$J$ catches wrong notes and lines that don't follow from the risk, and it does better than a simple "is it followed by a step?" rule. It misses smooth continuations that ignore the chords, because the interval span nearly pins down the risk note's pitch either way. Chord fit covers exactly that blind spot. Neither penalizes a well-formed resolution.

A temperature sweep tells the same story. Raising $T$ raises the risk rate (1.2 per 100 notes at $T = 0.8$, 7.7 at $T = 2.0$) and mean surprise; both rank perfectly with temperature (Spearman 1.0). $J$ stays human-like throughout: even at $T = 2.0$ the model follows 61% of its risks with a step, against 51% for humans. Its habit of recovering from a leap survives near-random sampling. Chord fit only departs from human practice at $T = 2.0$ (AUC 0.59).

**Temperature changes how many risks the model takes much more than how it handles them.**

---

# Caveats

- The risk measures compare against WJazzD, which is mostly bebop and post-bop. They measure closeness to that style, not musical quality: a novel but good risk unlike anything in the corpus would get flagged.
- $J$ can't tell a deliberate risk from a random note smoothed over afterwards, since both leave the same notes.
- Chord fit is a weak signal (a real note gains only 0.18 bits on average), so it separates *sets* of risks, not single notes.
- The generated sets are small: 17–105 risk events per temperature.
