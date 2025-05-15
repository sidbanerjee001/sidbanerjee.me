---
title: "Randomized Primality Testing with Monte Carlo Algorithms"
date: "2025-05-14"
---
# Motivation

Prime numbers are incredibly important for a lot of things in math: factoring, p-groups, modular arithmetic, etc. Many fields in computer science build upon these principles by applying them to areas like [security](https://crypto.stackexchange.com/questions/20867/why-are-primes-important-for-encryption) and [cryptography](https://en.wikipedia.org/wiki/RSA_cryptosystem). Naturally, we'll find it important to check whether a number is prime.

The naive algorithm for "primality testing" involves checking whether every number up to $n-1$ divides $n$ (trial division). This algorithm appears to operate in linear time (perhaps faster if we only check numbers up to $\sqrt{n}$), but it actually *doesn't* have a polynomial time complexity. Formally speaking, time complexity is measured with respect to the size of the input, and in this case, $n$ is the *value* of the input. Since it takes $\log{n}$ bits to represent the number $n$, our time complexity is actually

$$
O(2^{\log n})
$$

which is exponential in the size of the input. Though deterministic and unconditional primality testing algorithm is in $P$ ([AKS Primality Test](https://en.wikipedia.org/wiki/AKS_primality_test)) it's still pretty slow, especially when numbers are incredibly large. We're often faced with tasks like primality testing that are inefficient to deterministically compute; exploiting number theory and probability can lead us to more efficient solutions, though at some cost.

Most commonly used randomized algorithms are either Las Vegas algorithms or Monte Carlo algorithms. The former answers a query correctly and has a probabilistic runtime (e.g. QuickSelect) while the latter might get the answer wrong but has a fixed runtime (e.g. Primality Testing). This note will cover one type of a Monte Carlo algorithm with one-sided error: the Fermat primality test.

# Algorithm

In general, our goal is to find some mathematical property that holds for prime numbers but necessarily doesn't for composites--we'll exploit such a property to quickly determine whether a number is prime.

Fermat's Little Theorem (FLT) states that if $p$ is prime and $a$ is coprime to $p$, then $a^{p-1} \equiv 1 \; (\text{mod} \;p)$. This theorem holds for all numbers $\in \{2,\dots,p-1\}$ since, by definition of primality, $p$ has no factors. Using this fact, we develop the following algorithm:

```
FermatPrimality(N):
	Uniformly pick x in {1,...,N-1}
	if x^(N-1) % N = 1:
		return PRIME
	return COMPOSITE
```

If $N$ is in fact prime, the algorithm will always correctly identify it as prime, as FLT will certainly hold. If $N$ is composite, however, our algorithm may not be correct. Specifically, we may encounter a "Fermat liar": $b$ such that $b^{N-1} \equiv 1 \; (\text{mod} \;N)$. For example, we have

$$
2^{1386} \equiv 1 \; (\text{mod} \;1387)
$$

although $1387$ is not a prime number. Our algorithm may pick such a Fermat liar, and erroneously report "PRIME." With what probability will this occur? We'll prove the following statement: if $N$ is a composite, but not a Carmichael number[^1], then this algorithm outputs “composite” (i.e. is correct) with $p \geq \frac{1}{2}$.

# Proof of $\Pr[\text{correct}] \geq \frac{1}{2}$

We call a number $g$ a "Fermat witness" if $g^{N-1} \not\equiv 1 \; (\text{mod} \;N)$. How many more Fermat liars are there than witnesses in the range $(1, N)$? If we can compare the set of Fermat liars to Fermat witnesses, we can deduce this algorithm's one-sided correctness, since we're sampling uniformly from $\mathbb{Z} / N\mathbb{Z}$ (algebraic notation for the integers modulo $N$).

Since $N$ is composite (and not a Carmichael number) there exists at least one Fermat witness, which we denote $g$. Multiplying $g$ by any Fermat liar results in a Fermat witness, as shown below for an arbitrary Fermat liar $b$.

$$
(gb)^{n-1} \equiv g^{n-1} b^{n-1} \equiv g^{n-1} \cdot 1 \equiv g^{n-1} \not\equiv 1 \; (\text{mod} \;N).
$$

So we know every Fermat liar maps to a Fermat witness by the function $f(b)=gb$. Whats more interesting, however, is that this is an injective mapping:

$$
\begin{align*}
f(b_1) = f(b_2) \implies gb_1 &\equiv gb_2 \; (\text{mod} \;N) \\
g^{-1} gb_1 &\equiv g^{-1} gb_2 \; (\text{mod} \;N) \\
b_1 &\equiv b_2 \; (\text{mod} \;N) \\
b_1 &= b_2.
\end{align*}
$$

Note we select $g$ coprime to $N$ (so $N$ isn't trivially composite), allowing us to cancel it via it's modular inverse. This one-to-one mapping implies that at least half the numbers in $\mathbb{Z} / N\mathbb{Z}$ are Fermat witnesses--values that correctly identify $N$ as composite. Since our algorithm picks an integer at random, we can conclude that our probability of correctness if $N$ is compositive and not Carmichael is at least $\frac{1}{2}$.

This doesn't sound impressive, though. But remember we only sampled one value to test. If we sampled more and ran independent trials, the probability we'd be incorrect across all consecutive runs is around $1-\left( \frac{1}{2} \right)^t$ for $t$ trials, which achieves a 99% correctness rate in under 10 trials! This is a technique called boosting.

# Runtime

A single call to Fermat primality is dominated by the exponentiation and modulation operations, which are done in $O(\log^2 n \log \log n)$ time. Running for $k$ trials we have a runtime of $O(k\log^2 n \log \log n)$, which is highly efficient.

[^1]: Carmichael numbers, of which there are infinitely many, are the Achilles' heel of Fermat primality testing. A Carmichael number is a composite number $c$ that satisfies the property $b^{c-1} \equiv \; (\text{mod} \;c)$ for all integers $b$ coprime to $c$. In fact, Carmichael numbers contradicts the converse of FLT and prevents it from being an absolute test.