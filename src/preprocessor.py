import re


def remove_urls(text):
    """
    Remove URLs from the given text.
    """
    return re.sub(r'https?://\S+|www\.\S+', '', text)

def replace_emails(text):
    """
    # Replace email addresses with <EMAIL>.
    """
    return re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b', '<EMAIL>', text)

def normalize_whitespace(text):
    """
    Replace multiple whitespace characters with a single space.
    """
    return re.sub(r'\s+', ' ', text).strip()

def remove_html(text):
    """
    Remove HTML tags from the text.
    """
    return re.sub(r'<[^>]+>', '', text)

def replace_dates(text):
    """
    Replace dates with <DATE>.
    """
    return re.sub(
        r'\b\d{1,4}[-/]\d{1,2}[-/]\d{1,4}\b',
        '<DATE>',
        text
    )
    
def replace_numbers(text):
    """
    Replace standalone numbers with <NUMBER>.
    """
    return re.sub(r'\b\d+\b', '<NUMBER>', text)

def clean_text(text):
    """
    Apply all preprocessing steps to the input text.
    """

    text = remove_urls(text)
    text = replace_emails(text)
    text = remove_html(text)
    text = replace_dates(text)
    text = replace_numbers(text)
    text = normalize_whitespace(text)

    return text

# sample_text = """
# Visit https://openai.com

# Email: akhil@gmail.com

# Meeting on 15/07/2026

# Age: 22

# <b>Hello World</b>
# """

# print(clean_text(sample_text))