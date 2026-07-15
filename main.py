from src.data_loader import DataLoader

loader = DataLoader("data/raw/wikipedia_dataset")

wiki_files = loader.get_wiki_files()

content = loader.read_file(wiki_files[0])

print(content[:3000])