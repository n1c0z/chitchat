import { OPENAI_API_KEY } from '$env/static/private';
import { OpenAI } from 'langchain/llms/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { docs } from '$lib/functions/docs';

import type { Document } from 'langchain/document';

console.log(docs);
const csvContent = docs.map((doc: Document) => doc.pageContent);
console.log(`Page Content ---> ${csvContent}`);

const askModel = async (question: string) => {
	const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY });
	let vectorStore;

	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 1000,
		chunkOverlap: 900
	});
	console.log('Text Splitting......');
	console.log(`Chunk size  ----> ${textSplitter.chunkSize}`);
	console.log(`Chunk Overlap  ----> ${textSplitter.chunkOverlap}`);

	const splitDocs = await textSplitter.createDocuments(csvContent);

	// eslint-disable-next-line prefer-const
	vectorStore = await HNSWLib.fromDocuments(
		splitDocs,
		new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
	);

	await vectorStore.save('./storage');
	console.log(`Vector store created`);
	// }

	// RetrievalQAChain
	const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
	console.log('Querying...');
	const res = await chain.call({ query: question });
	console.log(res);
};
