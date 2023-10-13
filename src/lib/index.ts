// place files you want to import through the `$lib` alias in this folder.
	import { OpenAI } from 'langchain/llms/openai';
	import { PUBLIC_OPENAI_API_KEY } from '$env/static/public';
	// import { SerpAPI } from 'langchain/tools';
	// import { Calculator } from 'langchain/tools/calculator';
	// import { initializeAgentExecutorWithOptions } from 'langchain/agents';

	const model = new OpenAI({
		temperature: 0,
		openAIApiKey: PUBLIC_OPENAI_API_KEY,
		streaming: true,
		callbacks: [
			{
				handleLLMNewToken(token) {
					process.stdout.write(token);
				}
			}
		]
	});

	async function stream() {
		return await model.call('Write a song about sparkling water.');
	}

	stream();
