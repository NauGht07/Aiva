# Aiva

An AI habit companion with persistent memory. Aiva doesn't just track your habits — 
she remembers your patterns, reads your journal entries, and nudges you like a 
friend who's actually been paying attention.

## The idea

Most habit apps send the same generic reminder to everyone. Aiva builds an
understanding of each user over time — missed sessions, mood trends, 
journal context — and uses that to generate nudges that actually land.

## Architecture (in progress)

- React Native + Expo (mobile)
- Supabase (database + auth + scheduled functions)
- Local-first data layer with structured metadata extraction
- LLM API for contextual nudge generation

## Status

Pre-build. Architecture and design phase.

## Why

Behavioral data on what nudging techniques actually help stick to habits 
doesn't really exist at scale. Aiva is the instrument to collect it.
