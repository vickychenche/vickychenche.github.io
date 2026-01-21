# My First Win at a Hackathon

## The Win

At our year-end company dinner, I was sitting there really nervously waiting to hear the announcement. Knowing what my team and I built is amazing but still some doubts infiltrated my mind. When they announced the winner, I was over the moon. I won my first hackathon! I have never won a hackathon, although I've only been to three. 

The project my team built was an AI-powered Regulatory Reporting Hub—a full-stack application that brings intelligent querying capabilities to our knowledge bases and databases. The intention I had wasn't just to build something impressive, it was to prove to myself that I know how to design and develop a real solution under pressure, and create something that could actually improve internal workflows.

## What I Built

I built a full-stack application called **Data Query Hub with RAG** that provides intelligent querying capabilities over knowledge bases and databases. Here's what it does:

**RAG-Powered Chat** — Query knowledge base using AWS Bedrock. You can ask questions in natural language and get answers backed by our actual documentation and query patterns.

**Database Visualization** — Interactive schema and data lineage explorer. Helps teams understand how data flows through our systems without having to dig through old conversations.

**Natural Language to SQL** — Convert natural language questions directly into SQL queries. The system understands context and generates queries that match your actual database schema.

**Query Hub** — A curated repository of SQL queries with semantic search. Instead of searching for queries by exact keywords, you can find them by what they actually do.

**Data Lineage** — Track data flow and dependencies across systems. Useful for understanding impact when making changes.

## Tech Stack

This was my first time working with RAG and AWS Bedrock, so I learned a lot about how these pieces fit together.

### RAG (Retrieval-Augmented Generation)

RAG was the core of what made this work. Instead of relying solely on the LLM's training data, the system retrieves relevant context from our knowledge base first, then generates responses based on that retrieved information. This means the answers are grounded in our actual documentation, not just generic AI responses.

### AWS Bedrock

I chose AWS Bedrock for a few reasons:

**Titan Embedding Model** — AWS's Titan embedding model provided the best semantic search capabilities for our use case. It's optimized for finding relevant information even when the exact keywords don't match, which is crucial when dealing with technical documentation and SQL queries.

**Security** — Since we're dealing with internal company data and regulatory information, security was non-negotiable. Bedrock's security features, including encryption at rest and in transit, VPC endpoints, and IAM-based access control, gave us confidence to build this for production use.

### Claude Agent

I integrated Claude as the agent that handles natural language processing and conversation flow. Claude's ability to understand context and maintain coherent conversations made it perfect for the chat interface. The agent can understand follow-up questions, clarify ambiguous requests, and guide users toward better queries.

### Knowledge Base

The knowledge base pulls from multiple sources: regulatory PDFs, Confluence documentation, data lineage code, and tagged JSON files stored in a `queries/` folder. For the SQL queries, each JSON file contains structured metadata—title, tags, description, and variable extraction for parameterization. This structure allows the RAG system to do semantic search across query patterns, documentation, and code.

One feature I'm proud of is the query tagging system. Each SQL query in the knowledge base is structured as a JSON file with semantic tags across multiple dimensions—domain tags (like `rsp`, `audit`, `premium`), table tags, operation tags (like `batch`, `filtering`, `pattern-matching`), and parameter tags. This tagging strategy maximizes RAG retrieval accuracy because the system can find relevant queries even when the exact keywords don't match. For example, if someone asks "How do I find premium records for a specific policy?", the system can retrieve queries tagged with `premium` and `policy_identification` even if those exact words aren't in the query text. The structured format also allows for variable extraction, so queries can be parameterized and reused.


### Architecture

The application is built as a full-stack solution:

- **Backend**: FastAPI with AWS Bedrock integration, handling RAG retrieval, SQL generation, and API endpoints
- **Frontend**: React application providing the chat interface, database visualization, and query hub

The separation allowed me to iterate quickly on the frontend while the backend handled the heavy lifting of RAG and AI processing.

## Learnings

Working with RAG taught me a lot about how retrieval systems work. The quality of your embeddings matters enormously, and structuring your knowledge base well makes a huge difference in retrieval accuracy.

AWS Bedrock's API is well-designed, but there's a learning curve around prompt engineering for RAG. Getting the right balance between retrieved context and generated response took iteration.

The chat retention feature required careful state management. I had to think through how to maintain conversation context without overwhelming the context window.

## Reflection

This hackathon wasn't just about winning. It was about proving something to myself—that I can design and develop a real solution under pressure, work with cutting-edge technology I hadn't used before, and create something that actually improves workflows.

But more importantly, I came to a realization: having a diverse skill set in your team is important. I can't do everything alone. This was something I struggled with before, but I couldn't have succeeded without my teammates. One teammate was a project manager who knew the issues, helped plan, and tailored the solution to what actually mattered. Another developer supported and collaborated with me on the technical implementation. And one marketing person helped us put together a really beautiful deck and create a presentation that was really a whole—polished, clear, and compelling.

