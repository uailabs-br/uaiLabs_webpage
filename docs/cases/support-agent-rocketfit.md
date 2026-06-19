# Rocket Fit Support Agent

## Project & Problem

Rocket Fit is a training management platform for personal trainers that uses AI to improve athlete performance. As the user base grew, support was handled manually over WhatsApp and response time increased with answer quality becoming inconsistent depending on who was handling the messages. The team needed something that could respond instantly, at any hour, without adding headcount.

## The Solution

A customer support agent built to answer questions about the Rocket Fit app: how features work, common usage issues and known bugs. It uses RAG to pull relevant information from a structured knowledge base of FAQs and product documentation before generating any response, keeping answers accurate and grounded. Deployed on WhatsApp, so users get help exactly where they already are.

## Architecture & Stack

Built on n8n self-hosted with WhatsApp as the interface. The knowledge base lives in Supabase with pgvector for semantic search, enabling the agent to retrieve only the most relevant documentation before calling the model. Embeddings generated with OpenAI text-embedding-3-small and responses powered by GPT-4o mini. The stack runs on a VPS under Docker, keeping all data off third-party platforms.