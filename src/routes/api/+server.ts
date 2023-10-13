// path: /api/chat/+server.ts
import type { Config } from '@sveltejs/kit';
import { PUBLIC_OPENAI_API_KEY } from '$env/static/public';
import { StreamingTextResponse, LangChainStream } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage } from 'langchain/schema';

export const config: Config = {
	runtime: 'edge'
};

export const POST = async ({ request }) => {
	const { messages } = await request.json();
	const { stream, handlers } = LangChainStream();

	const llm = new ChatOpenAI({
		streaming: true,
		openAIApiKey: PUBLIC_OPENAI_API_KEY,
  });

	llm
		.call(
			messages.map((m) =>
				m.role == 'user' ?
				new HumanMessage(m.content)
					: new AIMessage(m.content)
			),
			{},
			[handlers]
		)
		.catch(console.error);

	return new StreamingTextResponse(stream);
};
