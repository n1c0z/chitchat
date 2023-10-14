import type { Config } from '@sveltejs/kit';
import { StreamingTextResponse, LangChainStream } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage } from 'langchain/schema';
import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';

export const config: Config = {
	runtime: 'edge'
};

//server endpoint for chatGpt Stream Chat
export const POST = async ({ request }) => {
	try {
		if (!OPENAI_API_KEY) {
			throw new Error('OpenAI key was not set');
		}

		const requestData = await request.json();

		if (!requestData) {
			throw new Error('No request data');
		}

		const messages = requestData.messages;

		if (!messages) {
			throw new Error('no messages provided');
		}

		const { stream, handlers } = LangChainStream();

		const llm = new ChatOpenAI({
			streaming: true,
			openAIApiKey: OPENAI_API_KEY
		});

		llm
			.call(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				messages.map((m: any) =>
					m.role == 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
				),
				{},
				[handlers]
			)
			.catch(console.error);

		return new StreamingTextResponse(stream);
	} catch (err) {
		console.error(err);
		return json({ error: 'There was an error processing your request' }, { status: 500 });
	}
};
