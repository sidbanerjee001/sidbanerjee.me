---
title: "John Coltrane, Jazz, and Markov Chains"
date: "2025-06-25"
link: ["GitHub", "https://github.com/sidbanerjee001/MarkovImprov"]
---

In 1948, mathematician Claude Shannon published a landmark paper, "A Mathematical Theory of Communication," in which he represented the English language as a Markov chain. This model contextualized language as probabilistic, which laid the groundwork for significant innovation in information theory, like in Google's PageRank.

Using Shannon's language Markov chain to actually generate text yields sentences without meaning—mostly consisting of made up words—because the basic statistical model lacks cohesive context. Modern LLMs have addressed this with transformers, which ascribe greater emphasis to context and broader meaning rather than probability distributions.

Yes, Markov chains might not result in "great" generative work, but it's still cool to experiment with. Here’s some generative music—or “improvisation,” if you will—created using Markov chains!

*Interestingly, Google Brain researchers published a paper on Music Transformers, which enable the generation of music with long-term structure. Read more [here](https://magenta.tensorflow.org/music-transformer)!*

---

We need to first create a bridge between music and computer by devising a mathematical model for improvisation.  
  
Every jazz solo has a unique answer to the following two questions: 

1. _What_ notes are being played? 
2. _When_ are they being played? 

Studying solos from this perspective engenders two distinct chains, one for pitch and one for rhythm. So, in this project, we segment transcribed[^1] solos into a MIDI Markov chain and a rhythm Markov chain.  
  
# MIDI Chain
  
Notes and rests are processed by the music21 Python library, formatted as a tuple. The first entry is the MIDI note (or the string ‘rest’ if it’s a rest) and the second entry is the duration (under the basis 1.0 = quarter note). Rests are converted to a MIDI note of 0; every note is then transposed down two semitones to match concert pitch.  
  
Notes are extracted separately into a list which is then copied into a message object in Max and fed into a `ml.markov`object. Ben Smith’s wonderful ml.* package provides a fully functional Markov chain object that simply needs training data to build. We can assign a metro object to the `ml.markov` object to continuously calculate the next note. Now we have a working note-generation chain, which we can hook up to a `kslider` and a synth pad to generate music.  
  
Unfortunately, we’re working with a fixed `metro` object which means every note is held for the exact same duration. How boring! The rhythm chain will fix this.  
  
# Rhythm Chain
  
Durations can be fractional, which prevents us from directly feeding it into a `ml.markov` object. Admittedly, I could have converted note lengths into milliseconds and rounded to create whole numbers that could be fed in, but I also wanted to experiment with creating my own Markov chains in Python.  
  
A “bidirectional” hashmap relates unique note lengths to unique integer key values. This allows us to build a transition matrix $P$ and calculate probability distributions for each row. Recall that $P[i][j]$ is the probability that state $i$ transitions to state $j$. $\sum{P[i]}$ = 1; $P[i]$ is our sampling distribution for state $i$.  
  
$n$ = 128 (arbitrary choice) values were sampled by my Markov chain. These values were imported into Max and iterated by list functions (`zl`) and a counter object (operating in $\mathbb{Z}/n\mathbb{Z}$ for $n$ = 128). Essentially, we’re iterating through the list of note lengths (since the values were already generated probabilistically in Python, unlike the MIDI chain which took advantage of `ml.markov`).  
  
At a high level, when the next note length is selected it should trigger the next MIDI note, and wait the duration of the selected note length before repeating this process. This suggests a kind of feedback loop with the `delay` object; luckily, Max operates from right to left, so we can feed the `delay` the correct value _before_ triggering it.  
  
In my demonstration I hooked up the `kslider` to a synth pad I’d designed a while ago to make some audio. I used Coltrane’s solo on Giant Steps (meaning lots of eighth notes)—see if you can hear how the generated notes reflect his solo!

---

# Max Patch

![Max Patch](https://media.discordapp.net/attachments/859919770047217675/1388595617114226708/MarkovImprov.png?ex=68618df1&is=68603c71&hm=ea85e33579092e3549c8719755d151caa1558788c603114a036b6e557b81bd0c&=&format=webp&quality=lossless&width=1162&height=1278)

[Audio Recording](https://youtu.be/pRIoKkIoxlo)

[^1]: I initially used Essentia's pitch extraction functionality to work with recordings but found it difficult to focus the tracking on the solo itself, and not deviate due to background instrumentation—especially when the soloist wasn't playing. So I turned to transcribed sheet music, which is conveniently encoded in MusicXML format.  