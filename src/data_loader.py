from pathlib import Path


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