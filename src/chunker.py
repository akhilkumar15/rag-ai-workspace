class TextChunker:

    def __init__(self, chunk_size=1000, overlap=200):
        self.chunk_size = chunk_size
        self.overlap = overlap
        
    def chunk_text(self, text):

        chunks = []

        step = self.chunk_size - self.overlap

        for i in range(0, len(text), step):

          chunk = text[i : i + self.chunk_size]

          chunks.append(chunk)

        return chunks
    
    def chunk_articles(self, articles):
        """
        Chunk all articles and return a flat list of chunks.
        """

        all_chunks = []

        for article in articles:

           chunks = self.chunk_text(article)
  
           all_chunks.extend(chunks)

        return all_chunks