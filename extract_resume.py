from pathlib import Path
from pypdf import PdfReader
path = Path('assets/brandonpriceresume.pdf')
reader = PdfReader(str(path))
text = ''
for page in reader.pages:
    text += page.extract_text() or ''
print(text)
