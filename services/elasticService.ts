
/**
 * Mocks the hybrid search functionality from ElasticSearch.
 * In a real application, this would make an API call to a backend
 * which in turn queries ElasticSearch.
 * @param query The user's search query.
 * @returns A promise that resolves to an array of document strings.
 */
export const hybridSearch = async (query: string): Promise<string[]> => {
  console.log(`Simulating Elastic hybrid search for: "${query}"`);

  // This is a mock database. We return relevant snippets based on keywords.
  const knowledgeBase: { [key: string]: string[] } = {
    "hybrid search": [
      "Hybrid search combines the strengths of traditional keyword-based search (like BM25) with modern vector-based semantic search.",
      "In a hybrid model, ElasticSearch can handle the keyword relevance while a vector database or an embedding model like Vertex AI's Gecko provides semantic understanding.",
      "The result is a more accurate and context-aware search experience, as it understands both the literal terms and the underlying intent of the query.",
      "Vertex AI generates dense vector embeddings from text, which represent the text's semantic meaning. These vectors are then stored and indexed in ElasticSearch for fast similarity searches.",
      "The final ranking of search results is often a combination of scores from both the keyword search and the vector search, providing a comprehensive relevance metric."
    ],
    "elastic": [
        "Elasticsearch is a distributed, free and open search and analytics engine for all types of data, including textual, numerical, geospatial, structured, and unstructured.",
        "Elasticsearch is built on top of Apache Lucene and provides a powerful RESTful API.",
        "It is known for its scalability, resilience, and fast search capabilities.",
    ],
    "vertex ai": [
        "Vertex AI is a unified machine learning platform from Google Cloud.",
        "It offers tools to build, deploy, and scale ML models, including pre-trained models like Gemini for generation and Gecko for text embeddings.",
        "Vertex AI aims to simplify the MLOps lifecycle from data preparation to model monitoring."
    ]
  };

  // Simple logic to find matching documents.
  const lowerCaseQuery = query.toLowerCase();
  let results: string[] = [];
  for (const keyword in knowledgeBase) {
    if (lowerCaseQuery.includes(keyword)) {
      results = [...results, ...knowledgeBase[keyword]];
    }
  }

  // If no specific keywords match, return a generic response.
  if (results.length === 0) {
    results = [
      "No specific context found in the knowledge base for this query. The AI will answer based on its general knowledge.",
      "The query did not match specific keywords in our simulated ElasticSearch index.",
    ];
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return results.slice(0, 5); // Return top 5 results
};
