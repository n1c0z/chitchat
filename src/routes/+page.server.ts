import { writeFile } from 'node:fs/promises';
import { extname } from 'path';

export const actions = {
	default: async ({ request }) => {
		try {
			const formData = await request.formData();
			console.log('🚀 ~ file: +page.server.ts:8 ~ default: ~ formData:', formData);
			const uploadedFile = formData?.get('file');
			console.log('🚀 ~ file: +page.server.ts:9 ~ default: ~ uploadedFile:', uploadedFile);
			const filename = `uploads/${crypto.randomUUID()}${extname(uploadedFile?.name)}`;
			await writeFile(filename, Buffer.from(await uploadedFile?.arrayBuffer()));
			console.log('🚀 ~ file: +page.server.ts:11 ~ default: ~ filename:', filename);
			return { success: true };
		} catch (err) {
			console.log('🚀 ~ file: +page.server.ts:16 ~ default: ~ err:', err);
			return { success: false };
		}
	}
};
