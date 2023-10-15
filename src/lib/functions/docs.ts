import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

const loader = new DirectoryLoader('./documents', {
	'.json': (path) => new JSONLoader(path),
	'.txt': (path) => new TextLoader(path),
	'.csv': (path) => new CSVLoader(path, { separator: ',' }),
	'.pdf': (path) => new PDFLoader(path)
});

// See contents of docs that are being being loaded
export const docs = await loader.load();
