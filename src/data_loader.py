from pathlib import Path
from src.preprocessor import clean_text


class DataLoader:

    def __init__(self, dataset_path: str):
        self.dataset_path = Path(dataset_path)

    def get_wiki_files(self):

        folders = ["1of2", "2of2"]

        wiki_files = []

        for folder in folders:

            folder_path = self.dataset_path / folder

            if folder_path.exists():

                files = sorted(folder_path.glob("wiki_*"))

                wiki_files.extend(files)

        return wiki_files

    def read_file(self, file_path):

        try:

            with open(file_path, "r", encoding="utf-8") as file:

                content = file.read()

            return content

        except Exception as error:

            print(f"Error : {error}")

            return None
        
        
    def load_data(self):
        """
        Load all Wikipedia articles from all wiki_* files.
        Returns a list of articles.
        """

        articles = []

        wiki_files = self.get_wiki_files()
        print(f"Found {len(wiki_files)} wiki files")

        for file_path in wiki_files:
            print(f"Reading: {file_path}")

            content = self.read_file(file_path)

            if content:
               articles.append(content)
        print(f"Loaded {len(articles)} files")
        return articles
        
    def preprocess_data(self, articles):
        """
        Apply text preprocessing to all articles.
        """

        cleaned_articles = []

        for article in articles:
          cleaned_articles.append(clean_text(article))

        return cleaned_articles
    
    def save_data(self, articles, output_path):
       """
       Save all cleaned articles into a text file.
       """

       with open(output_path, "w", encoding="utf-8") as file:

          for article in articles:
              file.write(article)
              file.write("\n\n")

       print(f"Processed dataset saved to {output_path}")