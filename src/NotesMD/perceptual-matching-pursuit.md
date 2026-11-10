---
title: "Perceptually-Informed Matching Pursuit for Computer Assisted Orchestration"
date: "2026-06-10"
---

Computer Assisted Orchestration (CAO) is the process of approximating an arbitrary target sound with a constrained, finite dictionary $D$ of available samples (atoms) by optimizing atom placement. Abstractly, this is similar to signal approximation; for example, 

$$
y[n] = \begin{bmatrix}
   1 \\
   3
\end{bmatrix},
D = \{ x_1[n] = \begin{bmatrix}
   1 \\
   0
\end{bmatrix}, x_2[n] = \begin{bmatrix}
   0 \\
   1
\end{bmatrix} \} \implies \hat{y}[n] = x_1[n] + 3x_2[n]
$$

Clearly, this process is trivial (and tractable) if $D$ is an orthogonal basis for $\mathbb{R}^n$. Our $x_i[n]$ are audio samples, however, and are therefore (1) likely not orthogonal (2) do not form a basis for a very high dimension $n$. As a result, applications of CAO remain intractable, relying heavily on greedy approximations, low-dimensional filters, and deep learning inference to constrain the NP-hard optimization problem. Given the state of the art, here are the main challenges:

1. Optimizing across global time is intractable, but algorithmic sub-target generation ignores complex morphologies.
2. Fixed-feature representations of $D$ are either handcrafted (biased) or learned (likely overfit)
3. Finding a feasible "optimization" function is non-trivial; i.e. it's hard to devise a metric that respects both audible similarity with creative generation.

Per (1), the current best approach is to segment the target (i.e. subtarget generation) $y[n]$ by spectral flux, although it can ignore nuanced morphologies like trills and underlying drones. Research has been done to predicate sub-target generation on stem-splitting and morphological classification, but has only [resulted in improvements in very constrained environments](https://hal.science/hal-03875545/document).

Our research is focused on addressing (2, 3). Specifically, we improve upon Orchidea's model by implementing a perceptually-weighted feature space and loss function to optimize over. Our algorithm follows these steps:

1. Macro-temporal segmentation (sub-target generation via spectral flux)
2. Partial/symbolic filtering (simplifying search space for each sub-target)
3. K-stochastic Matching Pursuit on each sub-target independently (operating over perceptually-informed feature space with well-defined inner product)
4. Recombination (placing each sub-target's approximation back at its onset to reconstruct the full target)

In other words, we never optimize over the whole target at once; each sub-target is orchestrated on its own, and the full hybridization only exists after recombination. The resulting hybridization can be evaluted both through informal listening tests and through the same perceptually-informed loss function used in step (3).

# A Perceptually-Informed Feature Space

[Zimtohrli](https://arxiv.org/abs/2509.26133) is an efficient psychoacoustic similarity metric that comes with a latent representation of audio (neurogram), a difference metric, and a lightweight MOS predictor for aligning with human preference. It therefore fits perfectly with our research, as our matching pursuit algorithm optimizes over neurogram similarity to align with the human listening experience. This neurogram weighs the mathematical spectrogram by the Equivalent Rectangular Bandwidths which closely match the cochlea's frequency response. Zimtohrli's key innovation is their parallel resonator path which introduces non-linearities to the neurogram-generation pipeline, accounting for real non-linear responses of the inner ear. Neurogram similarity is determined by a modified image similarity metric (NSIM), incorporating dynamic time warping and non-linear filters.

Our pre-processing stage included additional partial/symbolic filtering beyond Orchidea's, including feature downselection. Features are tuples of (spectral centroid, log attack time, smoothed envelope); before sub-targets are optimized, a similarity threshold must be met between the sub-target and candidate atoms.

# K-Stochastic Matching Pursuit

Standard matching pursuit greedily picks whichever atom best matches the current residual, subtracts it, and repeats. We make two changes. First, "best match" is measured in Zimtohrli's neurogram space rather than by a raw inner product, so for a sub-target residual $r_j$ and candidate atom $x \in D_j$ we score

$$
\text{score}(r_j, x) = \text{NSIM}\big(\mathcal{N}(r_j), \mathcal{N}(x)\big)
$$

where $\mathcal{N}(\cdot)$ is the Zimtohrli neurogram. Second, instead of always taking the top-scoring atom, we sample from the $K$ highest-scoring candidates. A purely greedy pursuit returns the same orchestration every time; sampling from the top $K$ trades a little optimality for variety, which matters when the goal is creative generation and not just reconstruction.

```
Orchestrate(y, D, K, T):
	Segment y by spectral flux into sub-targets s_1,...,s_m with onsets t_1,...,t_m
	for each sub-target s_j:
		D_j = Filter(D, s_j)                  // partial/symbolic filtering + feature threshold
		ŝ_j = KStochasticMP(s_j, D_j, K, T)
	return Recombine((ŝ_1, t_1),...,(ŝ_m, t_m))   // place each ŝ_j back at its onset t_j

KStochasticMP(s_j, D_j, K, T):
	r_j = s_j                                 // sub-target residual
	ŝ_j = 0
	for i in {1,...,T}:
		for each candidate atom x in D_j:
			score[x] = NSIM(Neurogram(r_j), Neurogram(x))
		Uniformly pick x* from the K highest-scoring atoms
		a = <r_j, x*> / <x*, x*>              // gain
		ŝ_j = ŝ_j + a·x*
		r_j = r_j - a·x*
		if NSIM(Neurogram(s_j), Neurogram(ŝ_j)) stops improving:
			break
	return ŝ_j
```

Note that the residual, the scoring, and the stopping criterion are all local to a single sub-target; nothing in `KStochasticMP` sees the rest of the target. This is what keeps the search tractable, and it's also why sub-target generation matters so much (per challenge (1) above).

# Examples

Here are two targets alongside the orchestrations our pipeline produced for them. Each output is the recombined hybridization, i.e. every sub-target approximated by K-stochastic matching pursuit and placed back at its onset.

![Target 1](/audio/TARGET_1.mp3)

![Orchestration 1](/audio/Orchestration_Output_1.mp3)

![Target 2](/audio/TARGET_2.mp3)

![Orchestration 2](/audio/Orchestration_Output_2.mp3)
